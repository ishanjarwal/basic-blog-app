const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    thumb: { type: String, required: true },
    content: { type: String, required: true },
    author_id: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema);
exports.Post = Post;