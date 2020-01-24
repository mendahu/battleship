const { UniqueThing } = require("./unique");

class Game extends UniqueThing {

  constructor(player1, player2, options, uid) {
    super();
    if (uid) {
      this.uid = uid;
    }
    this.players = [player1, player2];
    this.state = "Not Started";
    this.winner = "No Winner Yet";
    this.options = options;
    this.ships = {
      [player1.uid]: [],
      [player2.uid]: [],
    };
    this.boards = {
      [player1.uid]: [],
      [player2.uid]: [],
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
}

module.exports = { Game };