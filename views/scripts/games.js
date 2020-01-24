const { UniqueThing } = require("./unique");

class Game extends UniqueThing {

  constructor(players, options) {
    super();
    this.players = players;
    this.winner = "No Winner Yet";
    this.options = options;
  }

  get ships() {
    let shipObject = {
      [this.players[0]]: [],
      [this.players[1]]: []
    };

    //for (const ship in ships) {
    //
    //}

    return shipObject;
  }

  //checks a playerId and returns their opponent playerId given a gameId
  getOpponentId(playerId) {
    return this.players.filter(player => player !== playerId)[0];
  }

}

module.exports = { Game };