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
const generateColumn = function(coordinate, quantity) {
  
  //create array to house coordinates
  let rowArray = [];
  let currentColumn = getColumn(coordinate);

  //Loop an amount of times passed through and push the new coordinate to the array
  for (let i = 0; i < quantity; i++) {
    let currentRow = getRow(coordinate) + i;
    rowArray.push(currentColumn + currentRow);
  }
  return rowArray;
};

//takes one letter and returns the nth next letter in the alphabet
//does not work past "z" but this is not necessary for this exercise
const getNthLetterFrom = (letter, n) => String.fromCharCode(letter.charCodeAt(0) + n);

//genarates a column of coordinates vertically downward from a starting position based on quantity
const generateRow = function(coordinate, quantity) {

  //create array to house coordinates
  let columnArray = [];
  let currentRow = getRow(coordinate);

  //Loop an amount of times passed through and push the new coordinate to the array
  for (let i = 0; i < quantity; i++) {
    let currentColumn = getNthLetterFrom(getColumn(coordinate), i);
    columnArray.push(currentColumn + currentRow);
  }
  return columnArray;
};

//returns an array of tiles that a potential ship might occupy given size, location, direction
const getOccupiedTiles = function(coordinate, direction, size) {

  //check direction and return the appropriate array
  if (direction === "vertical") {
    return generateColumn(coordinate, size);
  } else if (direction === "horizontal") {
    return generateRow(coordinate, size);
  } else {
    return false;
  }
};

//checks an array of tiles to see if they are all on the board
const areValidTiles = function(tiles, boardSize) {
  let areValid = true;
  tiles.forEach(tile => {
    if (!isValidCoord(tile, boardSize)) {
      areValid = false;
    }
  });
  return areValid;
};

module.exports = {
  getColumn,
  getRow,
  isValidCoord,
  getNthLetterFrom,
  generateRow,
  generateColumn,
  getOccupiedTiles,
  areValidTiles
};