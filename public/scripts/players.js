const { UniqueThing } = require("./unique");
const { games } = require('./games');

//Player class for creating new players
class Player extends UniqueThing {

  constructor(name, uid) {
    super();
    if (uid) {
      this.uid = uid;
    }
    this.name = name;
    this.wins = 0;
  }

  get games() {
    let gameList = [];
    for (const game in games) {
      let players = games[game].players;
      if (players) {
        if (players[0] === this.uid || players[1] === this.uid) {
          gameList.push(game);
        }
      }
    }
    return gameList;
  }
}

//creates an object to house players
//players.addPlayer is a method to create a new player
let players = {

  addPlayer: function(name, uid) {
    let newPlayer = new Player(name, uid);
    let newPlayerUid = newPlayer.uid;
    players[newPlayerUid] = newPlayer;
  }
};

module.exports = { Player, players };