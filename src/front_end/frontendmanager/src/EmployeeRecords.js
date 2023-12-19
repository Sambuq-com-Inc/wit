import React, { useState } from 'react';
import './EmployeeRecords.css';

const EmployeeRecords = () => {
  // Dummy employee data
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Yash Chanekar' },
    { id: 2, name: 'Sammed Bhelande' },
    { id: 3, name: 'Akshay Kedar' },
    { id: 4, name: 'Shrushti Chougule' },
  ]);

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  return (
    <div className="employee-table-container">
      <h1 className="employee-table-heading">Employee Records</h1>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='records'>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td className='btnrecords'>
                <button className="edit-button">Edit</button>
                <button className="delete-button" onClick={() => handleDelete(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-employee-container">
        <h2>Add Employee</h2>
        <form className='addemployee'>
          <input type="text" placeholder="Employee Name" className='empinput' />
            <button type="submit" className='add'>+</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRecords;
