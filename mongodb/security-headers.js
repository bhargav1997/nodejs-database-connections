/*
Helmet library is a collection of middleware functions that set HTTP headers to help protect
your application from some well-known web vulnerabilities. Here’s how you can use it in your Express.js application:

First, install the helmet package by running npm install helmet in your project directory

By default, helmet enables the following middleware functions:

- dnsPrefetchControl: controls browser DNS prefetching
- frameguard: to prevent clickjacking
- hidePoweredBy: to remove the X-Powered-By header
- hsts: for HTTP Strict Transport Security
- ieNoOpen: sets X-Download-Options for IE8+
- noSniff: to keep clients from sniffing the MIME type
- xssFilter: adds some small XSS protections

*/

// app.js
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());

// ...
/*
  You can also enable additional middleware functions or configure the existing ones. For example, to enable Content Security Policy (CSP), you can do:
*/
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "wss://example.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}));
/*
  This sets the Content-Security-Policy header which helps to prevent Cross-Site Scripting (XSS) attacks and other code injection attacks.
*/
