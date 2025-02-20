// Create Web server

// Express is a Node.js web application framework
const express = require('express');
const app = express();

// body-parser extract the entire body portion of an incoming request stream and exposes it on req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow cross-origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Array of comments
let comments = [
  { id: 1, author: 'Adam', text: 'I love your post' },
  { id: 2, author: 'Dave', text: 'Nice work' },
  { id: 3, author: 'John', text: 'How can I do this?' },
  { id: 4, author: 'Adam', text: 'Where can I buy this?' },
  { id: 5, author: 'Dave', text: 'I want to learn more' },
];

// Get all comments
app.get('/comments', (req, res) => {
  res.send(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  res.send(comment);
});

// Post a comment
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,