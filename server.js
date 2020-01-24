//Server Config
const PORT = process.env.PORT || 8080;

//Requires
const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const { games, players, ships } = require("./views/scripts/data");

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
  const playerId = players.getPlayerIdByEmail(email);

  //checks if email or password were empty
  if (!(email || password)) {
    let errorCode = 400;
    let errorMsg = "Account creation requires a username and password";
    res.status(errorCode);
    return res.render("error", { user: "", errorMsg, errorCode });
  }

  //checks if email was already in use
  if (playerId) {
    let errorCode = 400;
    let errorMsg = "That email already has an acccount!";
    res.status(errorCode);
    return res.render("error", { user: "", errorMsg, errorCode });
  }

  let hashedPassword = bcrypt.hashSync(password, 10);

  const newPlayerId = players.addPlayer(name, email, hashedPassword);
  req.session["user_id"] = newPlayerId;

  console.log(players);

  res.render("newgame");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;


  res.render("welcome", { user: undefined });
});

/*******************************
404 ROUTING
*******************************/

app.use(function(req, res, next) {
  res.status(404).send("Path or File not found.");
});

app.listen(PORT, () => {
  console.log("Battleship Server Running!\nBrace for Impact!");
});