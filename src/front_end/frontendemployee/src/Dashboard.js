import React, { useState } from 'react';
import './EmployeeDashboard.css';
import EmployeeDashboard from './EmployeeDashboard';
import HRDashboard from './HRDashboard';

const Dashboard = ({ isHRLogin }) => {
  return (
    <EmployeeDashboard/>
  );
};

export default Dashboard;
