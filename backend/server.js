require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Student Attendance Schema with Unique Index
const studentSchema = new mongoose.Schema({
  name: String,
  year: String,
  department: String,
  phone: { type: String, unique: true }, // Ensures phone is unique
  email: { type: String, unique: true }, // Ensures email is unique
  institute: String,
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

// Routes
app.post('/submit', async (req, res) => {
  try {
    const { name, year, department, phone, email, institute } = req.body;

    // Check if a student with the same email or phone already exists
    const existingStudent = await Student.findOne({ $or: [{ email }, { phone }] });
    if (existingStudent) {
      return res.status(400).json({ error: 'User already registered!' });
    }

    // Save the new student record
    const newStudent = new Student({ name, year, department, phone, email, institute });
    await newStudent.save();
    res.status(201).json({ message: 'Attendance submitted successfully!' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
