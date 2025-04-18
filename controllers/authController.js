const userModel  = require("../models/user_model");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { generateToken } = require("../utils/generateToken")
require("dotenv").config();

module.exports.registerUser = async (req,res)=>{
    try {
        let {email,fullname , password} = req.body;
        let user = await userModel.findOne({email:email})
        if(user)return res.status(401).send("User Already Registered With This Email")
        else{
            bcrypt.genSalt(10 , (err , salt)=>{
                bcrypt.hash(password , salt , async (err, hash)=>{
                    if(err)return res.send(err.message)
                     else{
                        const user = await userModel.create({
                            fullname ,
                            email ,  
                            password:hash
                        });
                      const token = generateToken(user);
                    req.flash( "success" , "User Created Successfully")
                     res.cookie("token" , token); 
                     res.redirect("/")
                        }   
                })
            })
    
    }
    } catch (error) {
            res.send(error.message)
    }
   
}

module.exports.loginUser = async (req,res)=>{
    try {
    let {email, password} = req.body;
    let user = await userModel.findOne({email:email})
    if(!user)return res.status(401).send("Email or Password Incorrect");

    bcrypt.compare(password , user.password ,async (err , result)=>{
        if(result){
           const token = generateToken(user);
            res.cookie("token" , token);
            res.redirect("/gadget");
        }
        else{
            res.send(
                "Email or Password Incorrect"
            );
        }
        
    });
       
    } catch (error) {
            res.send(error.message)
    }
   
}

module.exports.logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};
