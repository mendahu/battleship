const { games } = require("./battleship");

//returns an 12-digit unique ID for use with games, users, and ships
const generateUid = function() {
  return Math.floor((1 + Math.random()) * 0x1000000000000).toString(16).substring(1);
};

//A library of ship size definitions
let shipLibrary = {
  carrier: 5,
  battleship: 4,
  submarine: 3,
  cruiser: 3,
  patrol: 2
};

//Gets the size of a ship based on its class
const getShipSize = shipClass => shipLibrary[shipClass];

//Get column from a coordinate
const getColumn = coordinate => coordinate[0];

//Get row from a coordinate
const getRow = cord => Number(cord.slice(1));

//helper function that checks a coordinate for board validity
const isValidCoord = function(coordinate, boardSize) {

  let row = getRow(coordinate);
  let col = getColumn(coordinate).charCodeAt(0);

  return !(
    row > boardSize ||
    row < 1 ||
    col < 97 ||
    col > 106 + (boardSize - 10)
  );

};

//generates a row of coordinates horizontally to the right based on a starting position and quantity
const generateColumn = function(coordinate, quantity, boardSize) {
  
  //create array to house coordinates
  let rowArray = [];
  let currentColumn = getColumn(coordinate);

  //Loop an amount of times passed through and push the new coordinate to the array
  for (let i = 0; i < quantity; i++) {
    let currentRow = getRow(coordinate) + i;

    //validate if the new coordinate is on the board, return false if not
    if (isValidCoord(currentColumn + currentRow, boardSize)) {
      rowArray.push(currentColumn + currentRow);
    } else {
      return false;
    }
  }

  return rowArray;
};

//takes one letter and returns the nth next letter in the alphabet
//does not work past "z" but this is not necessary for this exercise
const getNthLetterFrom = (letter, n) => String.fromCharCode(letter.charCodeAt(0) + n);

//genarates a column of coordinates vertically downward from a starting position based on quantity
const generateRow = function(coordinate, quantity, boardSize) {

  //create array to house coordinates
  let columnArray = [];
  let currentRow = getRow(coordinate);

  //Loop an amount of times passed through and push the new coordinate to the array
  for (let i = 0; i < quantity; i++) {
    let currentColumn = getNthLetterFrom(getColumn(coordinate), i);
    
    //validate if the new coordinate is on the board, return false if not
    if (isValidCoord(currentColumn + currentRow, boardSize)) {
      columnArray.push(currentColumn + currentRow);
    } else {
      return false;
    }
  }

  return columnArray;

};

//checks a playerId and returns their opponent playerId given a gameId
const getOpponentId = (playerId, gameId) => games[gameId].players.filter(player => player !== playerId)[0];

//returns an array of tiles that a potential ship might occupy given size, location, direction
const getOccupiedTiles = function(coordinate, direction, size, boardSize) {

  //check direction and return the appropriate array
  if (direction === "vertical") {
    return generateColumn(coordinate, size, boardSize);
  } else if (direction === "horizontal") {
    return generateRow(coordinate, size, boardSize);
  } else {
    return false;
  }
};

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

module.exports = {
  generateUid,
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
};