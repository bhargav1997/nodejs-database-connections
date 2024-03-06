// Require the mysql module
const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// Method to execute a query
pool.query('SELECT * FROM users', (error, results, fields) => {
  if (error) {
    console.error('Error executing query: ' + error);
    return;
  }
  console.log('Query results:', results);
});

// Method to execute a query with placeholders
const userId = 1;
pool.query('SELECT * FROM users WHERE id = ?', [userId], (error, results, fields) => {
  if (error) {
    console.error('Error executing query with placeholders: ' + error);
    return;
  }
  console.log('Query results with placeholders:', results);
});

// Method to escape query values
const name = "John";
const email = "john@example.com";
const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
const inserts = [name, email];
const formattedSql = mysql.format(sql, inserts);
console.log('Formatted SQL:', formattedSql);

// Method to escape query identifiers
const column = 'name';
const table = 'users';
const formattedIdentifier = mysql.escapeId(column);
console.log('Formatted identifier:', formattedIdentifier);

// Method to escape values within a query
const value = "John's";
const formattedValue = mysql.escape(value);
console.log('Formatted value:', formattedValue);

// Method to escape identifiers within a query
const identifier = "column name";
const formattedIdentifierWithinQuery = mysql.escapeId(identifier);
console.log('Formatted identifier within query:', formattedIdentifierWithinQuery);
