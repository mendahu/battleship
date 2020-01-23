const { UniqueThing } = require("./unique");

class Game extends UniqueThing {

  constructor(players, options) {
    super();
    this.players = players;
    this.state = "Not Started";
    this.winner = "No Winner Yet";
    this.options = options;
    this.ships = {
      [players[0]]: [],
      [players[1]]: [],
    };
  }

  //checks a playerId and returns their opponent playerId given a gameId
  getOpponentId(playerId) {
    return this.players.filter(player => player !== playerId)[0];
  }

}

module.exports = { Game };