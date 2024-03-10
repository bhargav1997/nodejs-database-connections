const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = process.env.MONGODB_URL;

// Database Name
const dbName = process.env.DB_NAME;

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

module.exports = {
  connect: function() {
    return new Promise((resolve, reject) => {
      client.connect(function(err) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        console.log("Connected successfully to server");
        resolve(client.db(dbName));
      });
    });
  }
};
