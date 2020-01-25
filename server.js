//Server Config
const PORT = process.env.PORT || 8080;

//Requires
const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");

/*******************************
MIDDLEWARE
*******************************/

app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ["endeavour-atlantis-discovery-columbia-challenger-intrepid-enterprise"],
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(express.static('views'));

/*******************************
GET ROUTING
*******************************/

app.get("/", (req, res) => {
  res.render("welcome", { user: undefined });
});

/*******************************
POST ROUTING
*******************************/

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  
  res.render("welcome", { user: undefined });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;


  res.render("welcome", { user: undefined });
});

/*******************************
404 ROUTING
*******************************/

// 404 Catch
app.get(function(req, res) {
  let errorCode = 404;
  res.status(404);
  res.render("error", { errorCode });
});

app.listen(PORT, () => {
  console.log("Battleship Server Running!");
});