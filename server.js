const express = require("express");
const cors = require("cors");
const app = express();
var mongoose = require('mongoose');

app.use(express.json())
app.use(cors());

const Schema = new mongoose.Schema({
    author: String,
    content: String,
    timestamp: { type: Date, default: Date.now },
    comments: [{
      author: String,
      content: String,
      timestamp: { type: Date, default: Date.now }
    }]
  });
  
const Message = mongoose.model('Message', Schema);

const uri = "mongodb+srv://Saad:chemistry909@cluster0.cl4dg.mongodb.net/Message";
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Connection successful
db.once('open', () => {
    console.log('Connected to MongoDB');

    const PORT = 3010;
    app.listen(PORT, () => {
        console.log(`Server Listening on port ${PORT}`);
    });
});