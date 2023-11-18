require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const UserController = require('./controller/UserController.js');
const PostController = require('./controller/PostController.js');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { Post } = require('./model/postmodel.js');
const uploadMiddleware = multer({ dest: 'uploads/' })

// middlewares
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // for crossorigins
app.use(express.json()) // for reading body data
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.static('build'))

// DB connection
con().catch(err => console.log(err));
async function con() {
    const uri = process.env.MONGO_URI
    await mongoose.connect(uri); //from mongoose docs
    console.log('DB Connection Successful');
}

// endpoints
app.post('/register', UserController.createUser)
app.post('/login', UserController.loginUser)
app.get('/profile', UserController.authUser)
app.post('/logout', UserController.logoutUser)
app.post('/create', uploadMiddleware.single('thumb'), PostController.createPost)
app.get('/posts', PostController.showPosts)
app.get('/post/:id', PostController.showPost)



app.listen(8080, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Server Started")
    }
})