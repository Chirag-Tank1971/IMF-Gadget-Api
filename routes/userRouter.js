const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model")
const {registerUser , loginUser , logoutUser } = require("../controllers/authController")
require("dotenv").config();

router.get("/" , (req,res)=>{
    res.render("index" ,{
        success: req.flash("success"),
        error: req.flash("error")
      })
})

router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.get("/logout" , logoutUser)


router.get("/profile/:userId" , async (req,res)=>{
    try {
        let user = await userModel.findById(req.params.userId).populate("cart")
        if(!user)return res.status(401).send("User Not Found")
        res.render("profile" , {user})
    } catch (error) {
        res.send(error.message)
    }
})


router.get("/editUser/:userId" , async (req,res)=>{
    try {
        let user = await userModel.findById(req.params.userId);
        res.render("editProfile" , {user})
    } catch (error) {
        res.send(error.message)
    }
});


router.post("/updateUser/:userId" , async (req,res)=>{
    try {
        try {
               const userId = req.params.userId;
               const { userName, userEmail, userAddress } = req.body;
               
                       const user = await userModel.findOneAndUpdate(
                   { _id: userId },
                   {   
                        fullname: userName,
                           email:   userEmail,  
                           address: userAddress,  
                           picture: req.file.buffer,
                   },
                   { new: true }
               );   

               res.redirect("/users/profile/" + userId);
           } catch (error) {
               console.error("Error updating User:", error);
               res.redirect("/users/editUser/" + req.params.userId);
           }
    } catch (error) {
        res.send(error.message)
    }
});

module.exports = router;