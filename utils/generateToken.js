const jwt = require("jsonwebtoken");


const generateToken = (user) => {
    console.log(process.env.JWT_KEY)
    let token = jwt.sign({email:user.email, id:user._id} ,process.env.JWT_KEY);
    
    return token
};

module.exports.generateToken = generateToken;