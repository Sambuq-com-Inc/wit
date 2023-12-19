// Install required packages: express, mongoose

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://eywa:Eywa1234@cluster1.pfnus6c.mongodb.net/Employee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Define a schema for employee leave data
const employeeLeaveSchema = new mongoose.Schema({
  name: String,
  leaveType: String,
  fromDate: Date,
  toDate: Date,
  fromTimeSlot: String,
  toTimeSlot: String,
  department: String,
  reason: String,
  leaveStatus: String
});

// Create a model from the schema
const EmployeeLeave = mongoose.model('leave', employeeLeaveSchema);

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
      leaveStatus,
    });

    // Save the employee leave document to the database
    await employeeLeave.save();

    res.status(201).json({ message: 'Leave application submitted successfully.' });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .json({ message: 'Error occurred while submitting leave application.', error: error.message });
  }
});

// Delete a leave application by ID
app.delete('/api/leave-delete/:id', async (req, res) => {
  try {
    const leaveId = req.params.id;

    // Find the leave application by ID
    const leave = await EmployeeLeave.findById(leaveId);

    // If the leave application doesn't exist, return an error response
    if (!leave) {
      return res.status(404).json({ message: 'Leave application not found.' });
    }

    // Delete the leave application from the database
    await EmployeeLeave.findByIdAndDelete(leaveId);

    res.status(200).json({ message: 'Leave application deleted successfully.' });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error occurred while deleting leave application.', error: error.message });
  }
});


// Get all employee leave data
app.get('/api/leave', async (req, res) => {
  try {
    // Retrieve all the employee leave documents from the database
    const employeeLeaves = await EmployeeLeave.find();

    // Send the employee leave data in the response
    res.status(200).json(employeeLeaves);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .json({ message: 'Error occurred while retrieving employee leave data.', error: error.message });
  }
});

// Get employee leave data by ID
app.get('/api/leave/:id', async (req, res) => {
  try {
    const leaveId = req.params.id; // Get the leave ID from the URL parameter

    // Find the employee leave document by ID
    const employeeLeave = await EmployeeLeave.findById(leaveId);

    if (!employeeLeave) {
      // If leave document with the provided ID is not found, send an error response
      return res.status(404).json({ message: 'Leave not found.'});
    }

    // Send the employee leave data in the response
    res.status(200).json(employeeLeave);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .json({ message: 'Error occurred while retrieving employee leave data.', error: error.message });
  }
});

// Update employee leave data by ID
app.put('/api/leave/:id', async (req, res) => {
  try {
    const leaveId = req.params.id; // Get the leave ID from the URL parameter
    console.log('Working');
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

    // Find the employee leave document by ID
    const employeeLeave = await EmployeeLeave.findById(leaveId);

    if (!employeeLeave) {
      // If leave document with the provided ID is not found, send an error response
      return res.status(404).json({ message: 'Leave not found.' });
    }

    // Update the employee leave document with the new data
    employeeLeave.name = name;
    employeeLeave.leaveType = leaveType;
    employeeLeave.fromDate = fromDate;
    employeeLeave.toDate = toDate;
    employeeLeave.fromTimeSlot = fromTimeSlot;
    employeeLeave.toTimeSlot = toTimeSlot;
    employeeLeave.department = department;
    employeeLeave.reason = reason;

    // Save the updated employee leave document to the database
    await employeeLeave.save();

    res.status(200).json({ message: 'Leave application updated successfully.' });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error occurred while updating leave application.', error: error.message });
  }
});

// Update leave

app.patch('/api/leaveStatus/:id', async (req, res) => {
  try {
    const leaveId = req.params.id; // Get the leave ID from the URL parameter
    const { leaveStatus } = req.body; // Get the leave status from the request body

    // Find the employee leave document by ID
    const employeeLeave = await EmployeeLeave.findById(leaveId);

    if (!employeeLeave) {
      // If leave document with the provided ID is not found, send an error response
      return res.status(404).json({ message: 'Leave not found.' });
    }

    // Update the leave status
    employeeLeave.leaveStatus = leaveStatus;

    // Save the updated employee leave document to the database
    await employeeLeave.save();

    res.status(200).json({ message: 'Leave status updated successfully.' });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error occurred while updating leave status.', error: error.message });
  }
});



const hrLoginSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
});

const HRLogin = mongoose.model('hrlogin', hrLoginSchema);

app.post('/api/hrlogin', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Received username:', username);
    console.log('Received password:', password);

    // Find the HR login document with the provided username and password
    const hr = await HRLogin.findOne({ username, password });

    console.log('Found HR:', hr);

    if (hr) {
      // If login is valid, send the corresponding HR name in the response
      res.status(200).json({ name: hr.name });
    } else {
      // If login is invalid, send an error response
      res.status(401).json({ message: 'Invalid username or password.' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error occurred while validating HR login.', error: error.message });
  }
});





// Start the server
app.listen(8001, () => {
  console.log('Server is running on port 8001');
});
