const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const apiRouter = require("./routes/index.js");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 2000;
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", apiRouter);

const uri = process.env.ATLAS_URI;
console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connected");
});

app.use(express.static(path.join(__dirname, "public/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/build/index.html"));
});
app.listen(port, () => {
  console.log("server running");
});
