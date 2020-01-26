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

app.get("/player/:playerId", (req, res) => {
  let playerId = req.session.player_id; //gets userId from login cookie
  let urlPlayerId = req.params.playerId;

  //IF the user is not logged in
  if (!(playerId === urlPlayerId)) {
    console.log("cred check fail", playerId, urlPlayerId);
    const errorCode = 403;
    const errorMsg = "You must be logged in to access this player profile.";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }
  
  res.render("player", { user: players[playerId] });
});

app.get("/", (req, res) => {
  let playerId = req.session.player_id; //gets userId from login cookie

  //IF the user is not logged in
  if (!playerId) {
    return res.render("welcome", { user: undefined });
  }
    
  res.redirect(302, `/player/${playerId}`);
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
  req.session["player_id"] = newPlayerId;

  res.redirect(302, `/player/${newPlayerId}`);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const playerId = players.getPlayerIdByEmail(email);

  //checks if email or password were empty
  if (!(email || password)) {
    const errorCode = 400;
    const errorMsg = "Login requires an email and password to authenticate!";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }
  
  //validate crentials
  if (!players.doesAuthenticate(email, password, playerId)) {
    const errorCode = 403;
    const errorMsg = "Invalid login credentials!";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }

  req.session["player_id"] = playerId;
  res.redirect(302, `/player/${playerId}`);
});

//Accepts POST requests to log user out by deleting their cookie
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect(302, `/`);
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