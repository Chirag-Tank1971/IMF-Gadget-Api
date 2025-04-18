const express = require("express");
const router = express.Router();


router.get("/" , (req, res)=>{
    res.render("index")
})
router.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.redirect("/")
    res.send("Logged Out")

})

module.exports = router;