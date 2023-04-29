const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Enable CORS for both origins
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'localhost:5500', '127.0.0.1:5500']
}));

app.use(bodyParser.json());

const messages = [];
app.get('/messages', (req, res) => {
  const lastIndex = parseInt(req.query.lastIndex, 10) || 0;
  const newMessages = messages.slice(lastIndex);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
  res.json(newMessages);
});

app.post('/messages', (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
  res.json({ message: 'Message added successfully' });
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  fs.readFile(__dirname + '/frontend/index.html', 'utf8', function (err, text) {
    res.send(text);
  });
})

server.setTimeout(5000);