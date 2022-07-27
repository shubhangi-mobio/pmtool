
/* all the jsonwebtoken  auth code will go here */

const jwt = require("jsonwebtoken");
const User = require('../models/user')


const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')

    // const token = req.body.token || req.query.token || req.header['Authorization'];
    if (!token) {
        return res.status(200).json({ success: false, message: 'Token is required.' });
    }
    try {
        const descode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = descode;
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    return next()
}


module.exports = verifyToken;
