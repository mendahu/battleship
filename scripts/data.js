const bcrypt = require("bcrypt");
const { getOccupiedTiles, areValidTiles } = require('./helpers');
const { Player } = require('./class_player');
const { Game } = require('./class_game');
const { Ship, shipLibrary } = require('./class_ship');

//creates an object to house players
//players.addPlayer is a method to create a new player
let players = {

  addPlayer: function(name, email, password, uid) {
    const newPlayer = new Player(name, email, password, uid);
    const newPlayerUid = newPlayer.uid;
    players[newPlayerUid] = newPlayer;
    return newPlayerUid;
  },

  getPlayerIdByEmail: (email) => {
    for (const player in players) {
      if (players[player].email === email) {
        return players[player].uid;
      }
    }
    return false;
  },

  doesAuthenticate: (email, password, playerId) => {
    const thisPlayer = players[playerId];
    
    if (!thisPlayer) {
      return false;
    }

    return (thisPlayer.email === email)
      ? bcrypt.compareSync(password, thisPlayer.password)
      : false;
  }
};

//Creates computer player
const hashedPassword = bcrypt.hashSync("computer", 10);
players.addPlayer("Computer", "computer@computer.com", hashedPassword, "0x00");

let games = {
  addGame: function(players, options, uid) {
    let newGame = new Game(players, options, uid);
    let newGameUid = newGame.uid;
    games[newGameUid] = newGame;
    players[0].associateGame(newGameUid);
    players[1].associateGame(newGameUid);
    return newGameUid;
  },

  isOccupied: function(playerId, coord) {

    this.ships[playerId].forEach(ship => {
      console.log(this.ships);
      ship.tiles.forEach(tile => {
        if (tile === coord) {
          return true;
        }
      });
    });
    return false;
  }
};
  
let ships = {
  
  //Adds a new ship to the database
  addShip: function(gameId, playerId, shipClass, coord, direction, uid) {

    const boardSize = games[gameId].boardSize;
    const occupiedTiles = getOccupiedTiles(coord, direction, shipLibrary[shipClass]);

    //the conditions to allow the addition of a ship
    const tilesAreOnBoard = areValidTiles(occupiedTiles, boardSize);
    const tilesAreEmpty = !games[gameId].areOccupied(playerId, occupiedTiles);
    const maxShipsNotReached = (games[gameId].ships[playerId].length < games[gameId].options.shipCount);

    //confirms that the ship position is on the board first
    if (tilesAreOnBoard && tilesAreEmpty && maxShipsNotReached) {

      //creates new ship
      let newShip = new Ship(gameId, playerId, shipClass, coord, direction, uid);
      let newShipId = newShip.uid;
      ships[newShipId] = newShip;
      games[gameId].associateShip(playerId, newShipId, occupiedTiles);
    }
  }
};

module.exports = { ships, games, players };