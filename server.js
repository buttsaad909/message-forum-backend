const express = require("express");
const cors = require("cors");
const app = express();
var mongoose = require('mongoose');

app.use(express.json())
app.use(cors());

// Schema for our data
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

// There isn't any confidential data, hence the only reason I am using my credentials here
const uri = "mongodb+srv://Saad:chemistry909@cluster0.cl4dg.mongodb.net/Message";
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Attempting MongoDB connection 
db.once('open', () => {
    console.log('Connected to MongoDB');

    // Retrieving all the messages
    app.get('/api/allmessages', async (req, res) => {
        try {
          const messages = await Message.find().sort({ timestamp: 'desc' });
          res.json(messages);
        } catch (error) {
          console.error('Error fetching messages:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
    // Posting and storing the messages from users
    app.post('/api/message', async (req, res) => {
        try {
            const newMessage = new Message(req.body);
            await newMessage.save();
            res.json({ message: 'Message posted successfully' });
        } catch (error) {
            console.error('Error posting message:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Posting and storing comments from users for the specific comments
    app.post('/api/message/:id/comments', async (req, res) => {
        try {
            const message = await Message.findById(req.params.id);
            message.comments.push(req.body);
            await message.save();
            res.json({ message: 'Comment added successfully' });
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
      
    const PORT = 3010;

    app.listen(PORT, () => {
        console.log(`Server Listening on port ${PORT}`);
    });
});