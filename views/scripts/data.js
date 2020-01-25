const bcrypt = require("bcrypt");
const { getOccupiedTiles, areValidTiles } = require('./helpers');
const { Player } = require('./players');
const { Game } = require('./games');
const { Ship, shipLibrary } = require('./ships');

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
      if (player.email === email) {
        return player.uid;
      }
    }
    return false;
  },

  doesAuthenticate: (email, password, playerId) => {
    if (!this[playerId]) {
      return false;
    }

    return (players[playerId].email === email)
      ? bcrypt.compareSync(password, this[playerId].password)
      : false;
  }

};

let games = {
  addGame: function(players, options) {

    let newGame = new Game(players, options);
    let newGameUid = newGame.uid;
    games[newGameUid] = newGame;
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

/*
//checks a board to see if a coordinate has a ship in it
const isOccupied = function(gameId, playerId, coordinate) {

  let ships;

  let isSpaceOccupied = false;

  //set ships object to variable for convenience
  if (games[gameId].ships[playerId] !== undefined) {
    ships = games[gameId].ships[playerId];
  } else {
    return false;
  }


  //loop through each ship
  for (const ship in ships) {

    //set each ship's tile array
    let occupiedTiles = ships[ship].occupiedTiles;

    //loop over each array
    occupiedTiles.forEach(element => {
      if (element === coordinate) {
        isSpaceOccupied = true;
      }
    });
  }

  return isSpaceOccupied;
};
*/


/*
  getGameList: function(playerId) {
    //takes a userID and returns an array of all the gameIDs they've played
    //start with empty game list
    let gameList = [];
  
    //Loop through games
    for (const game in this) {

      //wrap with a check to see if game.player exists (for when there are no records of games)
      //if either playerID matches, push the game ID to the list
      if (game.player !== undefined) {
        if ((game.players[0] === playerId) || (game.players[1] === playerId)) {
          gameList.push(game);
        }
      }
    }
    return gameList;
  }

    this[newGameId] = {

      takeTurn: function(coordinate) {
        let currentTurn = currentGame.currentTurn;
        let currentPlayer = currentGame.currentPlayer;

        //log the shot into the game record
        games[newGameId].shots[currentPlayer].push(coordinate);
        
        //increments turns in all the appropriate places
        if (currentTurn[1] === 0) {
          currentTurn[1]++;
        } else {
          currentTurn[0]++;
          currentTurn[1]--;
          this.shots.turnsCompleted++;
        }
        
        //changes current player
        currentGame.currentPlayer = getOpponentId(currentPlayer, newGameId);
      }
    };
    */

let ships = {
  
  //Adds a new ship to the database
  addShip: function(gameId, playerId, shipClass, coord, direction) {

    let boardSize = games[gameId].options.boardSize;

    let occupiedTiles = getOccupiedTiles(coord, direction, shipLibrary[shipClass]);
    let validTiles = areValidTiles(occupiedTiles, boardSize);

    let freeSpace = true;

    //confirms that the ship position is on the board first
    if (validTiles && freeSpace) {

      //creates new ship
      let newShip = new Ship(gameId, playerId, shipClass, coord, direction);
      let newShipId = newShip.uid;
      ships[newShipId] = newShip;
    }
  }
};



module.exports = { ships, games, players };

/*

    this[newGameId]["ships"]["addShip"] = function(shipClass, coordinate, direction, playerUID) {
      
      //checks if we have reached max ship amount
      let shipQuantity = Object.keys(games[newGameId]["ships"][playerUID]).length;
      if (shipQuantity >= games[newGameId].amountOfShips) {
        return;
      }
      
      //verifies that ship position if valid before adding new ship
      if (occupiedTiles && freeSpace) {
        this[playerUID][newShipId] = {
          class: shipClass,
          size: getShipSize(shipClass),
          coordinate: coordinate,
          direction: direction,
          occupiedTiles: occupiedTiles,
          status: true
        };
      }
    },
    */