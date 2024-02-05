const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const Post = require("./model/post");

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://phuwanathnamp:phuwanath.namp@cluster0.2nsn7m1.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    content: req.body.content,
    date: req.body.date,
    imageUrls: req.body.imageUrls,
    like: req.body.like,
    comment: req.body.comment,
    likechack: req.body.likechack,
    commentchack: req.body.commentchack,
    newComment: req.body.newComment,
  });
  post.save().then((createdPost) => {
    // console.log(result);
    console.log(createdPost);
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
});

app.use("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
  .then((result) => {
    console.log("delete!",result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

// app.put("/api/posts/like/:id", (req, res, next) => {
//   const postId = req.params.id;
//   Post.findByIdAndUpdate(
//     postId,
//     { $inc: { like: 1 } },
//     { new: true }
//   )
//   .then(updatedPost => {
//     if (!updatedPost) {
//       return res.status(404).json({ message: 'Post not found!' });
//     }
//     res.status(200).json({ message: 'Like updated successfully!', likes: updatedPost.like });
//   })
//   .catch(error => {
//     res.status(500).json({ message: 'Failed to update like!' });
//   });

// });

module.exports = app;
