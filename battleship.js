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
const boardValidator = function(coordinate) {

  let row = getRow(coordinate);
  let column = getColumn(coordinate);

  if (row > 10 ||
      row < 1 ||
      column.charCodeAt(0) > 106 ||
      column.charCodeAt(0) > 106) {
    return false;
  }

  return true;
};

//generates a row of coordinates horizontally to the right based on a starting position and quantity
const generateRow = function(coordinate, quantity) {
  
  //create array to house coordinates
  let rowArray = [];
  let currentColumn = getColumn(coordinate);

  //Loop an amount of times passed through and push the new coordinate to the array
  for (let i = 0; i < quantity; i++) {
    let currentRow = getRow(coordinate) + i;

    //validate if the new coordinate is on the board, return false if not
    if (boardValidator(currentColumn + currentRow)) {
      rowArray.push(currentColumn + currentRow);
    } else {
      return false;
    }
  }

  return rowArray;
};

//takes one letter and returns the nth next letter in the alphabet
//does not work past "z" but this is not necessary for this exercise
const getNthLetterFrom = function(letter, n) {
  return String.fromCharCode(letter.charCodeAt(0) + n);
};

//genarates a column of coordinates vertically downward from a starting position based on quantity
const generateColumn = function(coordinate, quantity) {

  //create array to house coordinates
  let columnArray = [];
  let currentRow = getRow(coordinate);

  //Loop an amount of times passed through and push the new coordinate to the array
  for (let i = 0; i < quantity; i++) {
    let currentColumn = getNthLetterFrom(getColumn(coordinate), i);
    
    //validate if the new coordinate is on the board, return false if not
    if (boardValidator(currentColumn + currentRow)) {
      columnArray.push(currentColumn + currentRow);
    } else {
      return false;
    }
  }

  return columnArray;

};

//returns an array of tiles that are occupied given a ship id
const getOccupiedTiles = function(shipID) {

  //set the ship's starting coordinate to a variable
  let coordinate = this.coordinate;

  //check direction and return the appropriate array
  if (this.direction === "horizontal") {
    return generateRow(coordinate, getShipSize(shipID));
  } else {
    return generateColumn(coordinate, getShipSize(shipID));
  }
};

//checks a playerId and returns their opponent playerId given a gameId
const getOpponentID = function(playerId, gameId) {
  let players = games[gameId].players.filter(player => player === playerId);
  return players[0];
};

//checks a coordinate on a player's map to see if it has been shot at already
const checkForHit = function(coordinate, gameId, playerId) {
  let shots = games[gameId].shots[getOpponentID(playerId)];
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
  shipPositions.forEach(coordinate => {
    if (checkForHit(coordinate)) {
      hitCount++;
    }
  });

  //return true if ship is still alive, false if hits = size
  return (hitCount < shipPositions.length);
};

let games = {
  addGame: function(playerId1, playerId2, smartPC, amountOfShips, shotsPerTurn, boardSize) {
    this[generateUid()] = {
      players: [playerId1, playerId2],
      winner: "No Winner Yet",
      smartComputer: smartPC,
      amountOfShips: amountOfShips,
      shotsPerTurn: shotsPerTurn,
      boardSize: boardSize,
      ships: {
        playerId1: {},
        playerId2: {},
        addShip: function(shipClass, coordinate, direction, playerUID) {
          this[playerUID][generateUid()] = {
            class: shipClass,
            size: getShipSize(),
            coordinate: coordinate,
            direction: direction,
            occupiedTiles: getOccupiedTiles(this),
            status: getShipStatus(this.occupiedTiles)
          };
        }
      },
      shots: {
        playerId1: [],
        playerId2: [],
        makeShot: function(playerId, coordinate) {
          this[playerId].push(coordinate);
        },
        incrementTurnCount: function() {
          this.turnCount++;
        },
        turnCount: 0
      },
    };
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
  addPlayer: players.addPlayer,
  addGame: games.addGame,
  getGamesList: games.getGameList,
  generateUid,
  getShipSize,
  getColumn,
  getRow,
  generateRow,
  boardValidator,
  getNthLetterFrom,
  generateColumn
};


/*
countGames(uid, type) = function {
  type: wins, losses
}

generateBoard = function(boardSize) {
  generate an array for the board
}

generateLeaderboard = function() {
  creates a leaderboard of all players ranked by wins against AI
  let leaderBoard = {
    playerUID: 6,
    playerUID: 4
  }
}

doesShotHit = function(coordinate) {
  takes a coordinate and returns true if it hits a ship
}

isPlayerStillAlive = function(shots, uid) {
  takes the shots object and the player uid to see if they are still alive
}

//players is a record of all players

let players = {
  5ng7: {
    name: "Computer",
    games: countGames(uid, wins) + countGames(uid, losses)
    wins: countGames(uid, wins)
    losses: countGames(uid, losses)
  }
  ab4d: {
    name: "Jake",
    games: countGames(uid, wins) + countGames(uid, losses)
    wins: countGames(uid, wins)
    losses: countGames(uid, losses)
  }
  addPlayer = function(name),
}

//games is a record of all games

let games = {
  gameUID: {
    grid = createGrid(boardSize),
    {
      "a": [0,1,2,3,4,5,6,7,8,9],
      "b": [0,1,2,3,4,5,6,7,8,9],
    }
    ships: {
      playerUID: {
        shipUID: {
          class: "Battleship",
          size: 5,
          damage: getDamage(shipUID)
          start: "j3"
          direction: "vertical"
          occupiedTiles: getOccupiedTiles(shipUID)
          status: getStatus(shipUID)
        },
        shipUID: {
          class: "Submarine",
          size: 3,
          start: "a4"
          direction: "horizontal"
          occupiedTiles: getOccupiedTiles(shipUID)
          status: getStatus(shipUID)
        }
      }
      addShip = function(class, coordinate, direction, playerUID)
        (isShipLocationValid(class, coordinates, direction, playerUID))
    }
    shots = {
      playerUID: ["a3", "b6", "c1"],
      playerUID: ["e3", "0", "f4"],
      makeShot = function(player, coordinates),
    }
    totalTurns: getTurnCount(gameUID);
  }
  addGame: function(uid1, uid2, smartPC, amountOfShips, shotsPerTurn, boardSize)
}
*/