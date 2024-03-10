/*
  Output Encoding: When you’re outputting user input, 
  make sure to escape any special characters that could be interpreted as code. 
  Here’s an example using the escape-html library
*/
const escapeHtml = require('escape-html');

function escapeOutput(userInput) {
  return escapeHtml(userInput);
}

module.exports = escapeOutput;
