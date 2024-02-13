const mongoose = require('mongoose'); // เรียกใช้ mongoose
const { type } = require('os'); // ใช้งาน mongoose สำหรับการเชื่อมต่อฐานข้อมูล

// สร้างโพสต์ schema สำหรับการบันทึกลงฐานข้อมูล โดยกำหนดชนิดของข้อมูลแต่ละ field และค่า default ที่จะใช้เมื่อไม่ได้ระบุค่า
const postSchema = mongoose.Schema({
    content: { type: String, default: ''},
    date: { type: Date, default: Date.now },
    imageUrls: { type: Array, default: []},
    like: { type: Number, default: 0 },
    comment: { type: Array, default: []},
    likechack: { type: Boolean, default: false},
    commentchack: { type: Boolean, default: false},
    newComment: { type: String}
});

module.exports = mongoose.model('Post', postSchema);
