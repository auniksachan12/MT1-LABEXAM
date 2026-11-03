// Import required modules
import http from 'http';
import fs from 'fs';
import path from 'path';

// Array to store employee tasks
let tasks = [
{
id: 1,
taskName: "Develop Login Page",
assignedTo: "Rahul Sharma",
status: "Pending"
},
{
id: 2,
taskName: "Create Homepage",
assignedTo: "Amit Kumar",
status: "Completed"
},
{
id: 3,
taskName: "Test Application",
assignedTo: "Priya Singh",
status: "Pending"
}
];

// Create HTTP server
const server = http.createServer((req, res) => {

// Route 1: Home page
if (req.url === '/' && req.method === 'GET') {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to Employee Task Management System</h1>');

}

// Route 2: Display all tasks
else if (req.url === '/tasks' && req.method === 'GET') {

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));

}

// Route 3: About page
else if (req.url === '/about' && req.method === 'GET') {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Employee Task Management Application</h1>');

}

// Route 4: Serve HTML using FS module
else if (req.url === '/home' && req.method === 'GET') {

    const filePath = path.join(process.cwd(), 'public', 'index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {

        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading HTML file');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }

    });

}

// Route 5: Add a new task
else if (req.url === '/add-task' && req.method === 'POST') {

    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {

        try {

            const newTask = JSON.parse(body);

            if (!newTask.id || !newTask.taskName ||
                !newTask.assignedTo || !newTask.status) {

                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'All required fields are necessary'
                }));

                return;
            }

            tasks.push(newTask);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Task added successfully',
                task: newTask
            }));

        } catch (error) {

            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Invalid JSON data'
            }));

        }

    });

}

// Invalid route
else {

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page Not Found');

}

});

// Start server on port 3000
server.listen(3000, () => {
console.log('HTTP Server running at http://localhost:3000');
});