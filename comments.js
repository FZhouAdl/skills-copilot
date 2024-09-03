// Create web server
const express = require('express');
const app = express();
app.use(express.json());
const comments = require('./comments.json');

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
});

// Create new comment
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        body: req.body.body
    };
    comments.push(comment);
    res.status(201).json(comment);
});

// Update comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    comment.body = req.body.body;
    res.json(comment);
});

// Delete comment
app.delete('/comments/:id', (req, res) => {
    const index = comments.findIndex(comment => comment.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    comments.splice(index, 1);
    res.json({ message: 'Comment deleted' });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});