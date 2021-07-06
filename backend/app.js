const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authorRoutes = require("./routes/authorRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");


//===================== connecting our database
mongoose.connect("mongodb://localhost:27017/bookself-old", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//======================== creating our application
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

app.listen(port, () => {
  console.log("Serving on port number" + port);
});
