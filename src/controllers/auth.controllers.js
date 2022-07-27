require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendMail = require("../utils/sendMail");
const { validationResult } = require('express-validator');


/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */



exports.UserLogin = async (req, res) => {
  try {
    let Validate = validationResult(req);
    console.log(req.body);
    if (!Validate.isEmpty()) {
      return res.status(400).json(Validate.array()[0].msg);
    }
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ email: email })
    if (userData) {
      const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        const userResult = {
          _id: userData._id,
          email: userData.email,
          password: userData.password,
          token: token
        }
        res.status(200).send({
          success: true,
          msg: 'User login',
          data: userResult
        });

      } else {
        res.status(400).send({ success: false, message: "login details  invalid" });
      }
    } else {
      res.status(400).send({ success: false, message: "check email address" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message);
  }
}

/**
 * @method - GET
 * @param - /profile
 * @description - User Profile
 */

exports.UserProfile = async (req, res) => {
  try {
    const id = req.body.id
    const data = await User.findOne({ _id: id })
    if (!data) {
      res.status(400).send({ error: "User Not Found" });
    }
    const newData = {
      "firstName": data.firstName,
      "lastName": data.lastName,
      "email": data.email,
    }
    res.status(200).json({ Data: newData })
  } catch (err) {
    res.status(500).send({
      error_message: err.message
    });
  }
};

/**
 * @method - PUT
 * @param - /update
 * @description - Update Profile
 */

exports.UpdateProfile = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedUser = { firstName, lastName, email, password, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedUser);
}

/**
 * @method - POST
 * @param - /logout
 * @description - Logout User
 */

exports.logoutUser = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ success: false, message: "Authorization failed" });
    }
    let tokenData = req.user.token
    await User.findByIdAndUpdate(req.user._id, tokenData)
    res.status(200).json({ success: true, message: "users was logout." });
  }
}


/**
 * @method - POST
 * @param - /forgot-password
 * @description - Forgot Password
 */

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email: email });
    if (userData) {
      const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
      await User.updateOne({ email: email }, { $set: { token: token } });
      await sendMail(userData.firstName, userData.email, token)
      res.status(200).json({ message: "Email send successfully" })
    }
    else {
      res.status(400).json({ message: "This email is not a exists" })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error_message: err.message });
  }
}


/**
 * @method - PUT
 * @param - /change-password
 * @description - Change Password
 */

exports.changePassword = async (req, res) => {
  const user_id = req.body.user_id
  const password = req.body.password
  const data = await User.findOne({ id: user_id })
  if (data) {
    const newPassword = await bcrypt.compare(password, data.password);
    const userData = User.findByIdAndUpdate({ _id: user_id, $set: { password: newPassword } })
    // res.status(200).send({ message: "user update"})
    res.status(200).json({ success: "user update", userData })


  } else {
    res.status(200).json({ message: "Token has been expired" })

  }
};

/**
 * @method - PUT
 * @param - /reset-password
 * @description - Reset Password
 */


exports.resetPassword = async (req, res) => {
  try {
    const token = req.query.token
    const tokenData = await User.findOne({ token: token })
    if (tokenData) {
      const password = req.body.password
      const confirmpassword = req.body.confirmpassword

      const newPassword = await bcrypt.hash(password, 10)
      if (confirmpassword !== password) {
        res.status(200).json({ message: "password is not match  " })
      }
      const userData = await User.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: newPassword, token: '' } }, { new: true })
      res.status(200).json({ message: "Password has been update", data: userData })
    } else {
      res.status(200).json({ message: "Token has been expired" })
    }
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }
}