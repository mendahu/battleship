const { getOccupiedTiles, areValidTiles } = require('./helpers');
const { Player } = require('./class_player');
const { Game } = require('./class_game');
const { Ship, shipLibrary } = require('./class_ship');

//creates an object to house players
//players.addPlayer is a method to create a new player
let players = {

  addPlayer: function(name, email, password, uid) {
    let newPlayer = new Player(name, email, password, uid);
    let newPlayerUid = newPlayer.uid;
    players[newPlayerUid] = newPlayer;
  }
};

let games = {
  addGame: function(player1, player2, options, uid) {
    let newGame = new Game(player1, player2, options, uid);
    let newGameUid = newGame.uid;
    games[newGameUid] = newGame;
    player1.associateGame(newGameUid);
    player2.associateGame(newGameUid);
  },
  
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