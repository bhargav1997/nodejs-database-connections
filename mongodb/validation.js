// validation.js
const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

module.exports = schema;


// Now, how to use validation js

const express = require('express');
const bodyParser = require('body-parser');
const schema = require('./validation');

const app = express();

app.use(bodyParser.json());

app.post('/register', (req, res) => {
  // Validate the incoming request with the Joi schema
  const { error } = schema.validate(req.body);

  if (error) {
    // If validation fails, send a 400 Bad Request response with the validation error message
    res.status(400).send({ error: error.details[0].message });
  } else {
    // If validation succeeds, proceed with the registration process
    // ...

    res.send({ message: 'Registration successful' });
  }
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});

