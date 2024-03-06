// Require the necessary modules
const express = require('express');
const mysql = require('mysql');

// Create an Express application
const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// Middleware function to handle database connections
app.use((req, res, next) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      // Handle connection errors
      console.error('Error getting MySQL connection: ' + err);
      return next(err);
    }
    
    // Attach the connection to the request object
    req.mysqlConnection = connection;

    // Call the next middleware function
    next();
  });
});

// Middleware function to release database connections
app.use((req, res, next) => {
  // Release the connection back to the pool
  if (req.mysqlConnection) {
    req.mysqlConnection.release();
  }
  next();
});

// Example route to execute a query
app.get('/users', (req, res) => {
  // Use the connection from the request object to execute a query
  req.mysqlConnection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error('Error executing query: ' + error);
      return res.status(500).send('Error executing query');
    }
    // Send the query results as JSON
    res.json(results);
  });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
