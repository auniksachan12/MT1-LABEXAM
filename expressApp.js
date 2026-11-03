
// Import Express
import express from 'express';

// Create Express application
const app = express();

// Middleware to read JSON data
app.use(express.json());

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Array containing employee tasks
let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending",
        priority: "High"
    },
    {
        id: 2,
        taskName: "Create Homepage",
        assignedTo: "Amit Kumar",
        status: "Completed",
        priority: "Medium"
    },
    {
        id: 3,
        taskName: "Test REST API",
        assignedTo: "Priya Singh",
        status: "Pending",
        priority: "Low"
    }
];

// 1. GET: Display all employee tasks
app.get('/tasks', (req, res) => {

    res.status(200).json(tasks);

});

// 2. GET: Display a particular task using ID
app.get('/tasks/:id', (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);

});

// 3. POST: Add a new employee task
app.post('/tasks', (req, res) => {

    // Read request body safely
    const { id, taskName, assignedTo, status, priority } = req.body || {};

    // Validate task details
    if (
        id === undefined ||
        !Number.isInteger(Number(id)) ||
        Number(id) <= 0 ||
        !taskName ||
        !assignedTo ||
        !status ||
        !priority
    ) {
        return res.status(400).json({
            message: "All task details are required"
        });
    }

    // Check duplicate ID
    if (tasks.some(t => t.id === Number(id))) {

        return res.status(400).json({
            message: "Task ID already exists"
        });

    }

    // Create new task
    const newTask = {
        id: Number(id),
        taskName: taskName,
        assignedTo: assignedTo,
        status: status,
        priority: priority
    };

    // Add task to array
    tasks.push(newTask);

    res.status(201).json({
        message: "Task added successfully",
        task: newTask
    });

});

// 4. PUT: Update an existing employee task
app.put('/tasks/:id', (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    // Read request body safely
    const { taskName, assignedTo, status, priority } = req.body || {};

    // Validate task details
    if (!taskName || !assignedTo || !status || !priority) {

        return res.status(400).json({
            message: "All task details are required"
        });

    }

    // Update task details
    task.taskName = taskName;
    task.assignedTo = assignedTo;
    task.status = status;
    task.priority = priority;

    res.status(200).json({
        message: "Task updated successfully",
        task: task
    });

});

// 5. DELETE: Delete an employee task using ID
app.delete('/tasks/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {

        return res.status(404).json({
            message: "Task not found"
        });

    }

    // Remove task from array
    const deletedTask = tasks.splice(index, 1);

    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });

});

// Handle invalid routes
app.use((req, res) => {

    res.status(404).json({
        message: "Route not found"
    });

});

// Start Express server on port 4000
app.listen(4000, () => {

    console.log("Express Server running at http://localhost:4000");

});
