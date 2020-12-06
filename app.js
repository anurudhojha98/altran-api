const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const router = require("./src/router");
const seedInitials = require("./src/seed");
const app = express();
const port = process.env.NODE_PORT||3000;
const uri=require('./src/config/config');

app.use(cors({
  optionsSuccessStatus: 200,
  origin: "*",
  // credentials: true,
})); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
app.use('/health-check', (req, res) => {
  res.send('I am OK');
});

// mount all routes on /api path
app.use('/api',router);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// error handler, send stacktrace only during development
// this.app.use(errorHandler(stack));
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true });
app.listen(port, () => console.log(`Listening on port ${port}`));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Database connected")
  console.log("Seeding...")
  seedInitials();
});