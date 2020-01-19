//const _ = require('lodash');
const {
  shipLibrary,
  getShipSize,
  getColumn,
  getRow,
  isValidCoord,
  getNthLetterFrom,
  generateRow,
  generateColumn,
  getOccupiedTiles,
  getOpponentId,
  isOccupied
} = require('./helpers');

const { games } = require('./games');

//Empty object to house shorthand data for the current game
let currentGame = {};

//sets current players to current game instance
const setPlayers = (players) => currentGame.players = players;

//sets current gameID to current game instance
const setGame = (gameId) => currentGame.uid = gameId;

/*

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

*/

module.exports = {
  currentGame,
  setPlayers,
  setGame,
  //checkForHit,
  //getShipStatus
};