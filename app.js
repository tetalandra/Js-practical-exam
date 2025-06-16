const express = require('express');
const app = express();
const students = [];

// Student class definition
class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }

    getDetails() {
        return `Name: ${this.name}, Grade: ${this.grade}`;
    }
}

// Middleware to parse JSON requests
app.use(express.json());

// POST route to add a student
app.post('/students', (req, res) => {
    try {
        const { name, grade } = req.body;
        
        // Basic validation
        if (!name || typeof grade !== 'number') {
            return res.status(400).json({ error: 'Name and grade are required. Grade must be a number.' });
        }

        const student = new Student(name, grade);
        students.push(student);
        
        res.status(201).json({ message: 'Student added successfully', student: student.getDetails() });
    } catch (error) {
        res.status(500).json({ error: 'Error adding student' });
    }
});

// GET route to retrieve all students
app.get('/students', (req, res) => {
    try {
        const studentDetails = students.map(student => student.getDetails());
        res.json({ students: studentDetails });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving students' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 