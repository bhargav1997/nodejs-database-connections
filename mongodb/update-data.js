/* 
You can update data in MongoDB using the updateOne, updateMany, 
or findOneAndUpdate methods provided by the MongoDB Node.js driver. 

Here’s an example of how you can use these methods:
*/

const MongoClient = require('mongodb').MongoClient;

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

  // Update one document
  db.collection('data').updateOne({ title: 'Old Title' }, { $set: { title: 'New Title' } }, function(err, result) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Updated the document with the field title equal to 'Old Title'");
  });

  // Update many documents
  db.collection('data').updateMany({ title: 'Old Title' }, { $set: { title: 'New Title' } }, function(err, result) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Updated all documents with the field title equal to 'Old Title'");
  });

  // Find one document and update
  db.collection('data').findOneAndUpdate({ title: 'Old Title' }, { $set: { title: 'New Title' } }, function(err, result) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Found one document with the field title equal to 'Old Title' and updated it");
  });
});
