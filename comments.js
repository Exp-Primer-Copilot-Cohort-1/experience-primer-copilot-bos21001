// Create web server
const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

// Load comments
const comments = require('./comments.json');

// Path: /comments
// GET request
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Path: /comments/:id
// GET request
app.get('/comments/:id', (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
    return;
  }
  res.json(comment);
});

// Path: /comments
// POST request
app.use(express.json());
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    name: req.body.name,
    email: req.body.email,
    body: req.body.body,
  };
  comments.push(comment);
  res.json(comment);
});

// Path: /comments/:id
// PUT request
app.put('/comments/:id', (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
    return;
  }
  comment.name = req.body.name;
  comment.email = req.body.email;
  comment.body = req.body.body;
  res.json(comment);
});

// Path: /comments/:id
// DELETE request
app.delete('/comments/:id', (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
    return;
  }
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.json(comment);
});
