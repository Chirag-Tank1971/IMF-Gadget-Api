const express = require('express'); 
const app = express();
const router = express.Router();
const path = require('path');
const userRouter = require("./routes/userRouter")
const gadgetRouter = require("./routes/gadget")
const cookieParser = require("cookie-parser")
const isloggedIn = require("./middleware/protectedURL")
const session = require("express-session");
const flash = require("connect-flash");

app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

// Pass flash messages to all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use(cookieParser())
const homeRouter = require("./routes/index")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine" , "ejs");

app.use("/", homeRouter)
app.use("/users", userRouter)
app.use("/gadget",isloggedIn, gadgetRouter)

const db = require("./config/db")


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})