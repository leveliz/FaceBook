const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/posts',(req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.use('/api/posts',(req, res, next) => {
  const posts = [
    {
      id: 'fadf12421l',
      content: 'First server-side post',
      date: new Date(),
      imageUrls: [
        'https://placekitten.com/200/300',
        'https://placekitten.com/200/300'
      ],
      like: 10,
      comment: ['Comment 1', 'Comment 2'],
      likechack: true,
      commentchack: true,
      newComment: 'New Comment'
    },
    {
      id: 'ksajflaj132',
      content: 'Second server-side post',
      date: new Date(),
      imageUrls: [
        'https://placekitten.com/200/300',
        'https://placekitten.com/200/300'
      ],
      like: 5,
      comment: ['Comment 3', 'Comment 4'],
      likechack: false,
      commentchack: false,
      newComment: 'Another Comment'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;
