const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const session = require('express-session');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authorRoutes = require("./routes/authorRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const app = express();

mongoose.connect(
  "mongodb+srv://userone:sinu1@ictakfiles.g1s0x.mongodb.net/ictAng1?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
//*************************** connecting our database ****************************
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=> {
	console.log("database connected")
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const sessionConfig = {
  secret:"thisisverysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: false,
      cookie:{secure:false},
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig));
app.use("/", userRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

app.listen(port, () => {
  console.log("Serving on port number" + port);
});
