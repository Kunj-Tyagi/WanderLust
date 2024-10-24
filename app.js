if(process.env.NODE_ENV !="production"){
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); //To parse data inside request.
app.use(methodOverride("_method")); //method override is npm package:-Jo put and delete request ko send karna mai kaam aati hai.
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

// Database name-wanderlust:)
const MONGOATLAS_URL = process.env.CONNECTION_STRING;

const store=MongoStore.create({
    mongoUrl: MONGOATLAS_URL,
    crypto:{
      sceret:process.env.SECRET_CODE,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
  console.log("ERROR in MONGO SESSION STORE", err);
})

const sessionOptions={
  store,
  secret:process.env.SECRET_CODE,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },
};


app.use(session(sessionOptions))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// main function ko call karna ka liya
main()
.then(() => {
  console.log("connected to DB");
})
.catch((err) => {
  console.log(err);
});

// for connection between node and mongodb!
async function main() {
  await mongoose.connect(MONGOATLAS_URL);
}

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})

app.get("/",(req,res)=>{
  res.render("home.ejs");
})

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",userRouter);

// Asaa route ka pass request ayi jo exist nhi karta!
app.all("*", (req, res, next) => {
  // Next ka andarr hum error pass karega!!
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

// server ko start karega 8080 port par:)
app.listen(8080, () => {
  console.log("Server is listening to port 8080.");
});
