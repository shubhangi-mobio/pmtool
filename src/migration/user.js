
require('dotenv').config();
require('../../config/db');
const bcrypt = require('bcrypt');
const User = require('../models/user')
bcrypt.hash('admin', 10, (err, hash) => {
    if (err) {
        console.log(err)
    }
    const seedUsers = new User({
        "firstName": "shubhangi",
        "lastName": "hingu",
        "email": "shubhangih.mobio@gmail.com",
        "password": hash,
        "role": "admin",
    })
    const seeddb = async() => {
        await User.insertMany(seedUsers)
    }
    seeddb().then(result => {
        console.log("User Inserted")
    }).catch(error => {
        console.log(error.message)
    })
})