// Role Management
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');


/**
 * @method - POST
 * @param - /login
 * @description - Admin Login
 */

exports.AdminLogin = async (req,res) => {
     
    try{
  
       let validate = validationResult(req);
         if(!validate.isEmpty()) {
             return res.status(400).json(validate.array());    
         }          
         
       
        let admin = await User.findOne( { email:req.body.email });
                
        if (!admin)
            return res.status(400).json({msg:'no admin account exists.'});
             
        let isPassCorrect = bcrypt.compareSync(req.body.password,admin.password);  
        if (isPassCorrect) {
            
            let token = jwt.sign({ email:admin.email },process.env.JWT_SECRET, { expiresIn: '12h', algorithm: 'HS256' }); 
            
            res.status(200).json(token);
        } else
            res.status(400).json({ msg: 'please enter correct password.' });  

    }catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message }); 
    }   
 
}







