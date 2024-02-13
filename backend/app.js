const express = require("express");
const bodyParser = require("body-parser"); //นำเข้าโมดูล เพื่อใช้ในการแปลงข้อมูลที่ส่งมาในรูปแบบของ JSON เป็น JavaScript object
const mongoose = require("mongoose");
const app = express();

const Post = require("./model/post");

// ใช้ body-parser สำหรับการแปลงข้อมูลที่ได้รับเป็น JSON
app.use(bodyParser.json());

// เชื่อมต่อฐานข้อมูล
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

// เพิ่ม body-parser middleware โดยกำหนดค่า limit ให้สามารถรับข้อมูลขนาดใหญ่ได้
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// ตั้งค่าสำหรับการทำ CORS
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

// สร้างโพสต์
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
  // บันทึกลงฐานข้อมูล
  post.save().then((createdPost) => {
    // console.log(result);
    console.log(createdPost);
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
});

// ดึงโพสต์ทั้งหมด
app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

// ดึงโพสต์ตาม ID แค่โพสต์เดียว โดยใช้ ID ที่ส่งมา และค้นหาจากฐานข้อมูล แล้วส่งกลับไป ถ้าไม่พบให้ส่งข้อความว่า "Post not found!" กลับไป
app.get("/api/posts/:id", (req, res, next) => {
  const postId = req.params.id;
  Post.findById(postId).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});


// ลบโพสต์ตาม ID แค่โพสต์เดียว โดยใช้ ID ที่ส่งมา และลบจากฐานข้อมูล แล้วส่งกลับไป ถ้าไม่สำเร็จให้ส่งข้อความว่า "Failed to delete post!" กลับไป
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
  .then((result) => {
    console.log("delete!",result);
    res.status(200).json({ message: "Post deleted!" });
  }).catch((error) => {
    res.status(500).json({ message: 'Failed to delete post!' });
  });
});

// อัพเดตโพสต์ ตาม ID แค่โพสต์เดียว โดยใช้ ID ที่ส่งมา และอัพเดตจากฐานข้อมูล แล้วส่งกลับไป ถ้าไม่สำเร็จให้ส่งข้อความว่า "Failed to update post!" กลับไป
app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    content: req.body.content,
    date: req.body.date,
    imageUrls: req.body.imageUrls,
    like: req.body.like,
    comment: req.body.comment,
    likechack: req.body.likechack,
    commentchack: req.body.commentchack,
    newComment: req.body.newComment,
  });
  // อัพเดตลงฐานข้อมูล โดยใช้ ID ที่ส่งมา
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
    console.log(result);
  }).catch((error) => {
    res.status(500).json({ message: 'Failed to update post!' });
    console.log(error);
  });
});

// แก้ไขค่า like ตาม ID แค่โพสต์เดียว และเพิ่ม like ใหม่ บันทึกลงฐานข้อมูล
app.patch("/api/posts/:id/like", (req, res, next) => {
  Post.updateOne({ _id: req.params.id }, { $inc: { like: 1 } })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Update successful!" });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to update post!' });
      console.error(error);
    });
});


// เพิ่ม comment ตาม ID แค่โพสต์เดียว และเพิ่ม comment ใหม่ บันทึกลงฐานข้อมูล
app.patch("/api/posts/:id/comment", (req, res, next) => {
  Post.updateOne({ _id: req.params.id }, { $push: { comment: req.body.comment } })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Update successful!" });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to update post!' });
      console.error(error);
    });
});

module.exports = app;
