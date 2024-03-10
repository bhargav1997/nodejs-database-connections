/*
  I can show you how to handle different requests using Express.js, 
  a popular web application framework for Node.js. Here’s an example where we connect 
  to MongoDB and handle some basic GET and POST requests:
*/

require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const Joi = require('joi');

const app = express();
app.use(bodyParser.json());

// Connection URL
const url = process.env.MONGODB_URL;

// Database Name
const dbName = process.env.DB_NAME;

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // Define schema for our data
  const dataSchema = Joi.object({
    text: Joi.string().required(),
    title: Joi.string().required()
  });

  // GET request
  app.get('/data', (req, res) => {
    db.collection('data').find({}).toArray((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'An error has occurred' });
      } else {
        res.send(result);
      }
    });
  });

  // POST request
  app.post('/data', (req, res) => {
    // Validate the incoming data
    const { error } = dataSchema.validate(req.body);
    if (error) {
      res.status(400).send({ error: error.details[0].message });
      return;
    }

    const data = { text: req.body.text, title: req.body.title };
    db.collection('data').insertOne(data, (err, result) => {
      if (err) { 
        console.error(err);
        res.status(500).send({ error: 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.listen(8000, () => {
    console.log('Listening on port 8000');
  });
});

/*

In this example, we’re using the body-parser middleware to parse the body of incoming requests, which is necessary for handling POST requests.

The GET request handler retrieves all documents from the ‘data’ collection and sends them back to the client.

The POST request handler inserts a new document into the ‘data’ collection. The data for the new document is expected to be provided in the body of the request.

Remember to install the necessary packages (express, mongodb, and body-parser) using npm by running npm install express mongodb body-parser in your project directory before running this script.

*/
