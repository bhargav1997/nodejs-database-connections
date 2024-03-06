// Require the mysql module to connect to MySQL
const mysql = require('mysql');

// Create connection configuration
const connection = mysql.createConnection({
  host: 'localhost',  // MySQL database host
  user: 'root',       // MySQL database user
  password: 'password',   // MySQL database password
  database: 'mydatabase'  // MySQL database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Close MySQL connection when done
connection.end();
