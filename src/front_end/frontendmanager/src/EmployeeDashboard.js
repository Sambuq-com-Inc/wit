import React, { useState } from 'react';
import './EmployeeDashboard.css';
// import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


const EmployeeDashboard = () => {
  const [name, setName] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromTimeSlot, setFromTimeSlot] = useState('');
  const [toTimeSlot, setToTimeSlot] = useState('');
  const [department, setdepartment] = useState('');
  const [reason, setReason] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const remainingValue = 3;

  const handleFormSubmit =async (e) => {
    e.preventDefault();

    try {
      // Perform leave application submission
      await axios.post('http://localhost:8000/api/leave', {
        name,
        leaveType,
        fromDate,
        toDate,
        fromTimeSlot,
        toTimeSlot,
        department,
        reason,
      });
      setIsFormVisible(false);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  

    // Perform leave application submission logic here

    // Reset form fields
    setName('');
    setLeaveType('');
    setFromDate('');
    setToDate('');
    setFromTimeSlot('');
    setToTimeSlot('');
    setdepartment('');
    setReason('');

    // Hide the form after submission
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible((prevIsFormVisible) => !prevIsFormVisible);
  };

  return (
    <div className="dashboard-container">
      <p className="someonename">Yash Chanekar</p>
      <h1 className="welcome-heading">WELCOME</h1>
      <div className="dashboardbtn">
        <button className="btndash1">Approved Leave</button>
        <button className="btndash2">Pending Leave</button>
        <button className="btndash3">Rejected Leave</button>
        <button className="btndash4">Unpaid Leave</button>
      </div>
      {/* <div className="progress">
        <CircularProgress
          style={{
            width: '10em',
            height: '10em',
            margin: '1em',
            color: '#F3A7A7',
            position: 'absolute',
            zIndex: '2',
          }}
          variant="determinate"
          value={(100*remainingValue)/12}
        />
        <CircularProgress
          style={{
            width: '10em',
            height: '10em',
            margin: '1em',
            color: '#E4E4E4',
            position: 'absolute',
            zIndex: '1',
          }}
          variant="determinate"
          value={100}
        />
      </div>
        <p className='pleave'>Leaves remaining: {remainingValue}</p> */}

      

      {isFormVisible && (
        <form className="leave-form" onSubmit={handleFormSubmit}>

<div className="form-group">
          <label htmlFor="name">Name:</label>
          
          <textarea
            id="reason"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          ></textarea>
        </div>

          <div className="form-group">
            <label htmlFor="leaveType">Leave Type:</label>
            <select
              id="leaveType"
              className="form-control"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="">Select Leave Type</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Maternity Leave">Maternity leave</option>
              <option value="Paternity Leave">Paternity leave</option>
              <option value="Emergency Leave">Emergency leave</option>
              <option value="Sabbatical Leave">Sabbatical leave</option>
              <option value="Sandwich Leave">Sandwich leave</option>
              <option value="Sick Leave">Sick Leave</option>
              {/* Add more leave type options */}
            </select>

            </div>


            <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select
              id="leaveType"
              className="form-control"
              value={department}
              onChange={(e) => setdepartment(e.target.value)}
            >
              <option value="">Select Leave Type</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Management">Management</option>
              <option value="Humanresource">Human Resource</option>
            </select>
          </div>




          <div className="form-group">
          <label htmlFor="fromDate">From:</label>
          <input
            type="date"
            id="fromDate"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <div className="time-slot-group">
            <label>
              <input
                type="radio"
                value="1sthalf"
                checked={fromTimeSlot === '1sthalf'}
                onChange={(e) => setFromTimeSlot(e.target.value)}
              />{' '}
              1st Half
            </label>
            <label>
              <input
                type="radio"
                value="2ndhalf"
                checked={fromTimeSlot === '2ndhalf'}
                onChange={(e) => setFromTimeSlot(e.target.value)}
              />{' '}
              2nd Half
            </label>
            <label>
              <input
                type="radio"
                value="full day"
                checked={fromTimeSlot === 'full day'}
                onChange={(e) => setFromTimeSlot(e.target.value)}
              />{' '}
              full day
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="toDate">To:</label>
          <input
            type="date"
            id="toDate"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <div className="time-slot-group">
            <label>
              <input
                type="radio"
                value="1sthalf"
                checked={toTimeSlot === '1sthalf'}
                onChange={(e) => setToTimeSlot(e.target.value)}
              />{' '}
              1st Half
            </label>
            <label>
              <input
                type="radio"
                value="2ndhalf"
                checked={toTimeSlot === '2ndhalf'}
                onChange={(e) => setToTimeSlot(e.target.value)}
              />{' '}
              2nd Half
            </label>
            <label>
              <input
                type="radio"
                value="full day"
                checked={fromTimeSlot === 'full day'}
                onChange={(e) => setFromTimeSlot(e.target.value)}
              />{' '}
              full day
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason for Leave:</label>
          <textarea
            id="reason"
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for leave"
          ></textarea>
        </div>
        
          {/* Rest of the form fields */}

          <button type="submit" className="submit-button">
            Submit
          </button>

          <button className="close-form-button" onClick={toggleFormVisibility}>
            Close
          </button>
        </form>
        
      )}
      <button className="apply-leave-button" onClick={toggleFormVisibility}>
        Apply Leave
      </button>
    </div>
  );
};

export default EmployeeDashboard;
