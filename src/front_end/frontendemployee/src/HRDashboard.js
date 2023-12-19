import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HRDashboard.css';

const HRDashboard = () => {
  const [employeesOnLeave, setEmployeesOnLeave] = useState([]);
  // const [employeeLogin, setEmployeeLogin] = useState([]);

  useEffect(() => {
    // Fetch the leave data from the employee database
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/leave');
        setEmployeesOnLeave(response.data);

        
      } catch (error) {
        console.error('Error occurred while fetching leave data:', error);
      }
    };

    fetchLeaveData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="welcome-heading">Welcome Back, HR</h1>

      <h2 className="table-heading">Current Employees on Leave</h2>

      <table className="leave-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Department</th>
            <th>Reason of Leave</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HRDashboard;
