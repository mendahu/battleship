const { UniqueThing } = require("./unique");

//Player class for creating new players
class Player extends UniqueThing {

  constructor(name) {
    super();
    this.name = name;
    this.games = [];
    this.wins = 0;
  }
}

//creates an object to house players
//players.addPlayer is a method to create a new player

let players = {

  "0x00": { //This is the computer player
    uid: "0x00",
    name: "Computer",
    //games: games.getGameList(this),
    //wins: getWinCount(this),
  },

  addPlayer: function(name) {
    let newPlayer = new Player(name);
    let newPlayerUid = newPlayer.uid;
    players[newPlayerUid] = newPlayer;
  }
};

module.exports = {
  Player,
  players
};