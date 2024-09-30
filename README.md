# Express CRUD API

This project is a simple Express.js API that allows you to perform CRUD operations (Create, Read, Update, Delete) on user data stored in a MySQL database.

## Database Setup
- Install MySQL
- Create Database: Run the following SQL command to create a database named test:

  CREATE DATABASE test;
    CREATE TABLE vs_user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        companyName VARCHAR(100) NOT NULL,
        designation VARCHAR(100) NOT NULL
    );


## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SreelayaC/express-crud-api.git
   cd express-crud-api

2. **Install Dependencies**
   ```bash
   npm install

3. **Run server**
   ```bash
   node index.js

