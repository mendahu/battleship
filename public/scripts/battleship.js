//const _ = require('lodash');
const {
  generateUid,
  shipLibrary,
  getShipSize,
  getColumn,
  getRow,
  isValidCoord,
  getNthLetterFrom,
  generateRow,
  getOccupiedTiles,
  getOpponentId,
} = require('./helpers');

//Empty object to house shorthand data for the current game
let currentGame = {};

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

let games = {
  addGame: function(playerId1, playerId2, smartPC, amountOfShips, shotsPerTurn, boardSize) {
    let newGameId = generateUid();
    this[newGameId] = {
      players: [playerId1, playerId2],
      winner: "No Winner Yet",
      smartComputer: smartPC,
      amountOfShips: amountOfShips,
      shotsPerTurn: shotsPerTurn,
      boardSize: boardSize,
      ships: {

      },
      shots: {
        turnsCompleted: 0,
      },
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
    this[newGameId]["ships"][playerId1] = {};
    this[newGameId]["ships"][playerId2] = {};
    this[newGameId]["ships"]["addShip"] = function(shipClass, coordinate, direction, playerUID) {
      
      //checks if we have reached max ship amount
      let shipQuantity = Object.keys(games[newGameId]["ships"][playerUID]).length;
      if (shipQuantity >= games[newGameId].amountOfShips) {
        return;
      }
      
      //checks if coordinates would go off the board or cover another ship
      let occupiedTiles = getOccupiedTiles(coordinate, direction, getShipSize(shipClass), games[newGameId].boardSize);
      let freeSpace = true;
      
      if (occupiedTiles) {
        //loops over over each coordinate new ship would occupy
        occupiedTiles.forEach(element => {
          //sets freeSpace to false if there is already a ship there
          if (isOccupied(newGameId, playerUID, element)) {
            freeSpace = false;
          }
        });
      }
      
      //new ship Id
      let newShipId = generateUid();
      
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
    this[newGameId]["shots"][playerId1] = [];
    this[newGameId]["shots"][playerId2] = [];
    this[newGameId]["shots"]["makeShot"] = function(playerId, coordinate) {
      this[playerId].push(coordinate);
    };
    currentGame["gameId"] = newGameId;
    currentGame["players"] = [playerId1, playerId2];
    currentGame["currentTurn"] = [0, 0];
    currentGame["currentPlayer"] = playerId1;
  },
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
};


//checks a coordinate on a player's map to see if it has been shot at already
const checkForHit = function(coordinate, gameId, playerId) {

  let shots;

  //check if there are any shots, and if so, assign it to a variable
  (games[gameId].shots[getOpponentId(playerId)])
    ? shots = games[gameId].shots[getOpponentId(playerId)]
    : shots = ["k11"];

  shots.forEach(tile => {
    if (tile === coordinate) {
      return true;
    }
  });
  return false;
};


//Takes an array of ship positions an returns true if some are unhit and false if all are hit
const getShipStatus = function(shipPositions) {
  //empty hit count to start
  let hitCount = 0;

  //check each ship position tile for a hit, log to hitCount if true

  for (const coordinate in shipPositions) {
    if (checkForHit(coordinate)) {
      hitCount++;
    }
  }

  //return true if ship is still alive, false if hits = size
  return (shipPositions !== undefined)
    ? (hitCount < shipPositions.length)
    : false;
};

//takes the userID and returns a number of wins
const getWinCount = function(playerId) {

  //start with empty win count
  let winCount = 0;

  //loop through game list
  for (const game in games) {
    //if winner of game matches player id, increment count
    if (game.winner === playerId) {
      winCount++;
    }
  }

  return winCount;
};

//creates an object to house players
//players.addPlayer is a method to create a new UID
let players = {
  0x00: { //This is the computer player
    name: "Computer",
    games: games.getGameList(this),
    wins: getWinCount(this),
  },
  addPlayer: function(name) {
    //generates a new player object with a UID
    this[generateUid()] = {
      name: name, //player's name string
      games: games.getGameList(this),
      wins: getWinCount(this),
    };
  }

};

module.exports = {
  currentGame,
  players,
  games,
  checkForHit,
  getShipStatus
};