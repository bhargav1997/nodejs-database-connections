const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

db.connect().then((database) => {
  // Now you can use the `database` object to interact with your database

  // GET request
  app.get('/data', (req, res) => {
    database.collection('data').find({}).toArray((err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result);
      }
    });
  });

  // POST request
  app.post('/data', (req, res) => {
    const data = { text: req.body.body, title: req.body.title };
    database.collection('data').insert(data, (err, result) => {
      if (err) { 
        res.send({ error: 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.listen(8000, () => {
    console.log('Listening on port 8000');
  });
}).catch((err) => {
  console.error("Failed to connect to db", err);
});
