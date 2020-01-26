//Server Config
const PORT = process.env.PORT || 8080;

//Requires
const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const { games, players, ships } = require("./scripts/data");

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

//For accessing a player profile
app.get("/player/:playerId", (req, res) => {
  const playerId = req.session.player_id; //gets userId from login cookie
  const urlPlayerId = req.params.playerId;
  
  //If user is not logged in
  if (!playerId) {
    const errorCode = 403;
    const errorMsg = "You must be logged in to access a player profile.";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }

  //If logged in user does not match
  if (!(playerId === urlPlayerId)) {
    const errorCode = 403;
    const errorMsg = "You must be logged in to access this player profile.";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }
  
  res.render("player", { user: players[playerId] });
});

//For accessing a game
app.get("/games/:gameId", (req, res) => {
  const playerId = req.session.player_id; //gets userId from login cookie
  const gameId = req.session.game_id; //gets userId from login cookie
  
  console.log(players[playerId], games[gameId]);

  //IF the user is not logged in
  if (!playerId) {
    const errorCode = 403;
    const errorMsg = "You must be logged in to play a game.";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }

  //If the player is a member of the game
  if (!games[gameId].isAPlayer(playerId)) {
    const errorCode = 403;
    const errorMsg = "You are not a member of this game.";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }

  console.log(games[gameId].state);

  //check game status
  switch (games[gameId].state) {
  case "Not Started":
    res.render("placement", { user: players[playerId], game: games[gameId] });
    break;
  case "In Progress":
    res.render("play", { user: players[playerId], game: games[gameId] });
    break;
  case "Completed":
    res.render("results", { user: players[playerId], game: games[gameId] });
    break;
  }

});

app.get("/games", (req, res) => {
  const playerId = req.session.player_id; //gets userId from login cookie

  //IF the user is not logged in
  if (!playerId) {
    const errorCode = 403;
    const errorMsg = "You must be logged in to start a new game.";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }
  
  res.render("games", { user: players[playerId] });
});

app.get("/", (req, res) => {
  const playerId = req.session.player_id; //gets userId from login cookie

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

//Accepts POST requests to start a new game
app.post("/games", (req, res) => {
  const playerId = req.session.player_id; //gets userId from login cookie
  
  //IF the user is not logged in
  if (!playerId) {
    const errorCode = 403;
    const errorMsg = "You must be logged in to start a new game.";
    res.status(errorCode);
    return res.render("error", { user: undefined, errorMsg, errorCode });
  }
  
  const { boardSize, shipCount, shotsPerTurn, smartPC } = req.body;

  //If form was not submitted completely
  if (!(boardSize || shipCount || shotsPerTurn || smartPC)) {
    const errorCode = 400;
    const errorMsg = "To start a new game you must complete the new game form.";
    res.status(errorCode);
    return res.render("error", { user: players[playerId], errorMsg, errorCode });
  }

  const gameId = games.addGame([players[playerId], players["0x00"]], { boardSize, shipCount, shotsPerTurn, smartPC });

  req.session["game_id"] = gameId;
  res.redirect(302, `/games/${gameId}`);
});

/*******************************
404 ROUTING
*******************************/

// 404 Catch
app.get(function(req, res) {
  const errorCode = 404;
  res.status(404);
  res.render("error", { errorCode });
});

app.listen(PORT, () => {
  console.log("Battleship Server Running!");
});