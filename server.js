const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory database
let students = [
  {
    id: 1,
    name: "John Doe",
    age: 20,
    course: "Computer Science"
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 21,
    course: "Business Administration"
  }
];

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Student Management REST API",
    endpoints: {
      getAllStudents: "GET /students",
      getStudent: "GET /students/:id",
      addStudent: "POST /students",
      updateStudent: "PUT /students/:id",
      deleteStudent: "DELETE /students/:id"
    }
  });
});

// Get all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// Get a student by ID
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

// Add a new student
app.post("/students", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || age === undefined || !course) {
    return res.status(400).json({
      message: "Name, age and course are required"
    });
  }

  const newStudent = {
    id: students.length
      ? Math.max(...students.map((student) => student.id)) + 1
      : 1,
    name,
    age: Number(age),
    course
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// Update a student
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, age, course } = req.body;

  if (name !== undefined) student.name = name;
  if (age !== undefined) student.age = Number(age);
  if (course !== undefined) student.course = course;

  res.status(200).json({
    message: "Student updated successfully",
    student
  });
});

// Delete a student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
