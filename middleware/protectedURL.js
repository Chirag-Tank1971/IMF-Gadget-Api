
function isloggedIn(req, res, next) {
    const token = req.cookies.token;
        if (!token) {
        return res.redirect("/");
    }else{
        return next();
    }

}

module.exports = isloggedIn;