//returns an 8-digit unique ID for use with games, users, and ships
const generateUid = function() {
  return Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
};

let players = {
  addPlayer: function(name) {
    this[generateUid()] = {
      name: name
    };
  }
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

        }
      },
      shots: {
        playerId1: [],
        playerId2: [],
        makeShot: function(playerId, coordinate) {
        },
        incrementTurnCount: function() {
          this.turnCount++;
        },
        turnCount: 0
      },
    };
  }
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