const usermodel = require('../model/usermodel.js');
const User = usermodel.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createUser = async (req, res) => {
    let { username, email, password } = req.body;
    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();
    password = password.trim();
    const checkUser = await User.findOne({ $or: [{ "username": username }, { "email": email }] })
    if (!checkUser) {
        const newUser = new User({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        });
        await newUser.save()
            .then((val) => res.json({ "Registration": true }))
            .catch((err) => res.json({ "Error": err, "Registration": false }))
    } else {
        res.json({ "userExists": true, "Registration": false })
    }
}

exports.loginUser = async (req, res) => {
    let { username, password } = req.body
    username = username.toLowerCase().trim()
    password = password.trim()
    const userDoc = await User.findOne({ username: username });
    let passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({ username: userDoc.username, id: userDoc._id }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({ username:userDoc.username, id: userDoc._id })
        })
    }
}

exports.authUser = async (req, res) => {
    const { token } = await req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
            if (err) throw err;
            res.json(info)
        })
    } else {
        res.json('token not found')
    }
}

exports.logoutUser = async (req, res) => {
    await res.cookie('token', '').json('ok')
}