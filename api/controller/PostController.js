const fs = require('fs')
const postmodel = require('../model/postmodel.js')
const Post = postmodel.Post
const jwt = require('jsonwebtoken')

exports.createPost = async (req, res) => {
    const { token } = req.cookies
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
        const { originalname, path } = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)

        const { title, summary, content } = req.body
        const newPost = new Post({
            title,
            summary,
            content,
            thumb: newPath,
            author_id: info.id
        })
        await newPost.save()
            .then(val => res.json('ok'))
            .catch(err => res.json(err))
    })
}

exports.showPosts = async (req, res) => {
    const posts = await Post.find()
        .populate('author_id', ['username'])
        .sort({ 'createdAt': -1 })
        .limit(15)
    res.json(posts);
}

exports.showPost = async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id).populate('author_id', ['username'])
    res.json(post)
}