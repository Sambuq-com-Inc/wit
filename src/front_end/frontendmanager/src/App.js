import { useEffect, useState } from "react";
import "./App.css";
import Calender from "./Calender";
import Dashboard from "./Dashboard";
import Leavehistory from "./Leavehistory";
import Login from "./Login";
import Mainpage from "./Mainpage";
import Notifications from "./Notifications";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeRecords from "./EmployeeRecords";
// import { Route } from 'react-router-dom';

// import Create from "./Create";


function App() {

  const [data,setData] = useState();
    // Function to retrieve data from session storage
  const getDataFromSessionStorage = () => {
    const savedData = sessionStorage.getItem('login');
    if (savedData) {
      setData(savedData);
    }
  };

  useEffect(() => {
    // Retrieve data from session storage when component mounts
    getDataFromSessionStorage();
  },[]);

  return (
    <Router>
    {data ? (
      <Sidebar>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Leavehistory" element={<Leavehistory />} />
          <Route path="/Calender" element={<Calender />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/EmployeeRecords" element={<EmployeeRecords />} />

          <Route path="*" element={<> not found</>} />
        </Routes>
      </Sidebar>
    ) : (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    )} 
  </Router>
  );
}

export default App;
