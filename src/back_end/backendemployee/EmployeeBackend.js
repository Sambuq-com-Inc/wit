// Install required packages: express, mongoose
//import userId, { setGlobalVariable } from './global.js';
// const { default: axios } = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// const EmployeeLeave = require('./models/EmployeeLeave'); // Import the EmployeeLeave model
// const EmployeeLogin = require('./models/EmployeeLogin');

const app = express();
app.use(express.json());
app.use(cors());


// Connect to MongoDB
const mong = mongoose.connect('mongodb+srv://eywa:Eywa1234@cluster1.pfnus6c.mongodb.net/Employee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });



// Define a schema for employee leave data
const employeeLeaveSchema = new mongoose.Schema({
  name: String,
  empId: String,
  leaveType: String,
  fromDate: Date,
  toDate: Date,
  fromTimeSlot: String,
  toTimeSlot: String,
  department: String,
  reason: String,
  leaveStatus: String,
});

// Create a model from the schema
const EmployeeLeave = mongoose.model('leave', employeeLeaveSchema);

app.get('/api', async (req, res) => {
  res.send('Hello World!');
})

// Create a route to handle form submission and save data to the database
app.post('/api/leave', async (req, res) => {


  try {
    const {
      name,
      leaveType,
      fromDate,
      toDate,
      fromTimeSlot,
      toTimeSlot,
      department,
      reason,
      leaveStatus,
    } = req.body;

    // Create a new employee leave document
    const employeeLeave = new EmployeeLeave({
      name,
      leaveType,
      fromDate,
      toDate,
      fromTimeSlot,
      toTimeSlot,
      department,
      reason,
      leaveStatus: 'Pending',
    });

    // Save the employee leave document to the database
    await employeeLeave.save();

    res.status(201).json({ message: 'Leave application submitted successfully.' });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error occurred while submitting leave application.', error: error.message });
  }
});

const employeeLoginSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});


const EmployeeLogin = mongoose.model('login', employeeLoginSchema);

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Received email:', email);
    console.log('Received password:', password);

    // Find the employee login document with the provided email and password
    const employee = await EmployeeLogin.findOne({ email, password });
    //setGlobalVariable(employee._id);


    console.log('Found employee:', employee);
    console.log('ID-',employee._id);


    if (employee) {
      // If login is valid, send the corresponding employee name in the response
      res.status(200).json({ name: employee.name });
    } else {
      // If login is invalid, send an error response
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while validating login.', error: error.message });
  }
});


app.get('/api/employees', async (req, res) => {
  try {
    // Retrieve all the employee login documents from the database
    const employees = await EmployeeLogin.find();

    // Send the employee login data in the response
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while retrieving employee login data.', error: error.message });
  }
});





// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
