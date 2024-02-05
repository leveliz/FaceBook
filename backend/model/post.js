const mongoose = require('mongoose');
const { type } = require('os');

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
