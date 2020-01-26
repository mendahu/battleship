const { UniqueThing } = require("./unique");

class Game extends UniqueThing {

  //players should be an array with two objects in it, references to the player objects
  //options should be an object with four key value pairs
  // boardSize: 10, 11, or 12
  // shotsPerTurn: 1 or 2
  // shipCount: 5, 6 or 7
  // smartPC: true or false
  constructor(players, options, uid) {
    super();
    if (uid) {
      this.uid = uid;
    }
    this.players = players;
    this.state = "Not Started";
    this.winner = "No Winner Yet";
    this.options = options;
    this.ships = {
      [players[0].uid]: [],
      [players[1].uid]: [],
    };
    this.boards = {
      [players[0].uid]: [],
      [players[1].uid]: [],
    };
  }

  //checks a playerId and returns their opponent playerId given a gameId
  getOpponentId(playerId) {
    return this.players.filter(player => player.uid !== playerId)[0].uid;
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

  associateShip(playerId, shipId, occupiedTiles) {
    this.ships[playerId].push(shipId);
    occupiedTiles.forEach(tile => {
      this.boards[playerId].push(tile);
    });
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

  isAPlayer(playerId) {
    if (this.players[0] === playerId || this.players[1] === playerId) {
      return true;
    }
    return false;
  }
}

module.exports = { Game };