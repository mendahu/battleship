//Server Config
const PORT = process.env.PORT || 8080;

//Requires
const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");

app.use(express.static('public'));
app.set("view engine", "ejs");

/*******************************
GET ROUTING
*******************************/

app.get("/", (req, res) => {
  res.render("welcome");
});

// 404 CATCH
app.use(function(req, res, next) {
  res.status(404).send("Path or File not found.");
});

app.listen(PORT, () => {
  console.log("Battleship Server Running!");
});