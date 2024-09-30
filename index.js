const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'test', 
    database: 'test' 
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// CRUD operations-----------

// Create a new user
app.post('/create-users', (req, res) => {
    const { name, email, companyName, designation } = req.body;
    const sql = 'INSERT INTO vs_user (name, email, companyName, designation) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, companyName, designation], (err, result) => {
        if (err) {
            return res.status(500).send({
                api_status: false,
                message: "Error adding data",
            });
        }
        res.status(201).send({
            api_status: true,
            data: [{
                id: result.insertId, 
                name,
                email,
                companyName,
                designation
            }],
            message: "Data added successfully"
        });
    });
});

// get all users
app.get('/getall-users', (req, res) => {
    const sql = 'SELECT * FROM vs_user';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({
                api_status: false,
                message: "Error fetching data",
            });
        }
        res.status(200).send({
            api_status: true,
            data: results.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                companyName: user.companyName,
                designation: user.designation
            })),
            message: "Data fetched successfully"
        });
    });
});

// get user by id
app.post('/get-user', (req, res) => {
    const { id } = req.body; 
    const sql = 'SELECT * FROM vs_user WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).send({
                api_status: false,
                message: "User not found",
            });
        }

        const user = results[0];
        res.status(200).send({
            api_status: true,
            data: [{
                id: user.id,
                name: user.name,
                email: user.email,
                companyName: user.companyName,
                designation: user.designation
            }],
            message: "Data fetched successfully"
        });
    });
});

// Update a user by id
app.put('/edit-user', (req, res) => {
    const { id, name, email, companyName, designation } = req.body; 
    const sql = 'UPDATE vs_user SET name = ?, email = ?, companyName = ?, designation = ? WHERE id = ?';

    db.query(sql, [name, email, companyName, designation, id], (err, result) => {
        if (err || result.affectedRows === 0) {
            return res.status(404).send({
                api_status: false,
                message: "User not found or error updating",
            });
        }

        res.status(200).send({
            api_status: true,
            data: [{
                id,
                name,
                email,
                companyName,
                designation
            }],
            message: "Data updated successfully"
        });
    });
});

// Delete a user by id
app.post('/del-user', (req, res) => {
    const { id } = req.body; 
    const sql = 'DELETE FROM vs_user WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err || result.affectedRows === 0) {
            return res.status(404).send({
                api_status: false,
                message: "User not found or error deleting",
            });
        }

        res.status(200).send({
            api_status: true,
            message: "Data deleted successfully"
        });
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});