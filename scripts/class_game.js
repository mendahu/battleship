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
    this.boards = {
      [players[0]]: [],
      [players[1]]: [],
    };
  }

  //checks a playerId and returns their opponent playerId given a gameId
  getOpponentId(playerId) {
    return this.players.filter(player => player !== playerId)[0];
  }

  startGame() {
    this.state = "In Progress";
  }

  endGame() {
    this.state = "Completed";
  }

  get boardSize() {
    return this.options.boardSize;
  }

  associateShip(playerId, shipId) {
    this.ships[playerId].push(shipId);
  }

  //checks if a coordinate is occupied by a ship on a player's board
  isOccupied(playerId, coord) {
    let board = this.boards[playerId];
    for (const coordinate of board) {
      if (coordinate === coord) {
        return true;
      }
    }
    return false;
  }

  //checks if an array of coordinates pass over any ships
  areOccupied(playerId, arrayOfCoords) {
    for (const coord of arrayOfCoords) {
      if (this.isOccupied(playerId, coord)) {
        return true;
      }
    }
    return false;
  }
}

module.exports = { Game };