import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HRDashboard.css';

const HRDashboard = () => {
  const [employeesOnLeave, setEmployeesOnLeave] = useState([]);

  const approveLeave = async (leaveId) => {
    try {
      await axios.patch(`http://localhost:8001/api/leaveStatus/${leaveId}`, {
        leaveStatus: 'Approved',
      });
      window.location.reload();
      // Update the UI or fetch updated leave data if needed
    } catch (error) {
      console.error('Error occurred while approving leave:', error);
    }
  };

  const rejectLeave = async (leaveId) => {
    try {
      const firsturl = `http://localhost:8001/api/leaveStatus/${leaveId}`
      const response1 = await axios.patch(firsturl, {
        leaveStatus: 'rejected',
      });
      window.location.reload();

     
    } catch (error) {
      console.error('Error occurred while rejecting leave:', error);
    }
  };

  useEffect(() => {
    // Fetch the leave data from the employee database
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/leave');
        setEmployeesOnLeave(response.data);
      } catch (error) {
        console.error('Error occurred while fetching leave data:', error);
      }
    };

    fetchLeaveData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="welcome-heading">Welcome Back, Manager</h1>

      <h2 className="table-heading">Leave Request</h2>

      <table className="leave-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Department</th>
            <th>Reason of Leave</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employeesOnLeave.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.leaveType}</td>
              <td>{employee.fromDate}</td>
              <td>{employee.toDate}</td>
              <td>{employee.department}</td>
              <td>{employee.reason}</td>
              <td>
                {employee.leaveStatus}
                {(employee.leaveStatus!=="rejected" && employee.leaveStatus!=="Approved")?
              <div className='apprej'>
              <button
                  className="btnapprove"
                  onClick={() => approveLeave(employee._id)}
                >
                  Approve
                </button>
                <button
                  className="btnreject"
                  onClick={() => rejectLeave(employee._id)}
                >
                  Reject
                </button>
                </div>:<div></div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HRDashboard;
