const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRout = require("./routes/auth");
const userRout = require("./routes/Users");
const PostRout = require("./routes/Posts");
const categoryRout = require("./routes/Categories");
const multer = require("multer");
const path = require("path")
const storage = "./images"

dotenv.config();
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose
  .connect(process.env.URL_DB)
  .then(console.log("Database connected"))
  .catch((err) => console.log(err))

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been upload...");
});

app.use("/api/auth", authRout);
app.use("/api/users", userRout);
app.use("/api/Posts", PostRout);
app.use("/api/Categories", categoryRout); 
 
app.listen("5000", () => {
  console.log("server is running....");
});
