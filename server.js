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
    const errorCode = 400;
    const errorMsg = "Account creation requires a username and password";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }
  
  //checks if email was already in use
  if (playerId) {
    const errorCode = 400;
    const errorMsg = "That email already has an acccount!";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newPlayerId = players.addPlayer(name, email, hashedPassword);
  req.session["user_id"] = newPlayerId;

  res.render("newgame", { user: players[newPlayerId] });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const playerId = players.getPlayerIdByEmail(email);
  console.log(email, password, playerId);

  //checks if email or password were empty
  if (!(email || password)) {
    console.log("hit an empty email or pass");
    const errorCode = 400;
    const errorMsg = "Login requires an email and password to authenticate!";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }
  
  //validate crentials
  if (!players.doesAuthenticate(email, password, playerId)) {
    console.log("does not authenticate");
    console.log(players.doesAuthenticate(email, password, playerId));
    const errorCode = 403;
    const errorMsg = "Invalid login credentials!";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }

  res.render("newgame", { user: players[playerId] });
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