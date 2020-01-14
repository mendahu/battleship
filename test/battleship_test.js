const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');

const battleshipFunctions = require('../battleship.js');

describe("Basic Functions", function() {

  it("generateUid() should return a twelve digit string", function() {

    const generateUid = battleshipFunctions.generateUid();

    assert.isTrue(generateUid.length === 12 && typeof generateUid === "string");

  });

  it("getShipSize() should return the length of a ship", function() {

    const submarineShipSize = battleshipFunctions.getShipSize("submarine");

    assert.isTrue(submarineShipSize === 3);

  });

  it("getColumn should return the letter component of a coordinate", function() {

    const column = battleshipFunctions.getColumn("d4");

    assert.isTrue(column === "d");

  });

  it("getRow should return the Number component of a coordinate", function() {

    const row = battleshipFunctions.getRow("d4");

    assert.isTrue(row === 4);

  });

});

describe("Cordinate Manipulation", function() {


  it("boardValidator should return true if a coordinate is in the board", function() {

    assert.isTrue(battleshipFunctions.boardValidator("d4"));

  });

  it("boardValidator should return false if a coordinate is off the board", function() {

    assert.isFalse(battleshipFunctions.boardValidator("d11"));

  });

  it("boardValidator should return false if a coordinate is off the board", function() {

    assert.isFalse(battleshipFunctions.boardValidator("l3"));

  });

  it("generateRow should return a row of coordinates equal to the size passed through", function() {

    const row = battleshipFunctions.generateRow("d4", 5);

    assert.deepEqual(row, ["d4", "d5", "d6", "d7", "d8"]);

  });

  it("generateRow should return false if the row would push over the edge of the board", function() {

    const row = battleshipFunctions.generateRow("d7", 5);

    assert.isFalse(row);

  });


  it("getNthLetterFrom should return number of letters further down the alphabet", function() {

    const letterCheck = battleshipFunctions.getNthLetterFrom("a", 2);

    assert.equal(letterCheck, "c");

  });

  it("generateColumnn should return a row of coordinates equal to the size passed through", function() {

    const column = battleshipFunctions.generateColumn("d4", 5);

    assert.deepEqual(column, ["d4", "e4", "f4", "g4", "h4"]);

  });

  it("generateColumn should return false if the column would push over the edge of the board", function() {

    const column = battleshipFunctions.generateColumn("h4", 5);

    assert.isFalse(column);

  });

});

let players = {
  0x00: { //This is the computer player
    name: "Computer",
    games: [
      "123456abcdef",
      "abcdef123456",
      "abc123def456",
      "123abc456def",
      "321abc654def",
      "abc321def654",
      "abcdef654321",
      "654321abcdef",
      "fedcba123456"
    ],
    wins: 3
  },
  a1b2c3d4e5f6:{
    name: "Jake",
    games: [
      "123456abcdef",
      "abcdef123456",
      "abc123def456",
      "123abc456def",
      "321abc654def",
      "abc321def654",
      "abcdef654321",
      "654321abcdef",
      "fedcba123456"
    ],
    wins: 6
  },
  addPlayer: battleshipFunctions.addPlayer
};

players.addPlayer("Fitz");

let newID = _.findKey(players, ["name", "Fitz"]);

describe("Player Manipulation", function() {

  it("addPlayer should generate a new player with a unique 12 digit ID", function() {

    assert.isTrue(newID.length === 12);

  });

  it("addPlayer should generate a new player with an empty array of games", function() {

    assert.deepEqual(players[newID]["games"], []);

  });

  it("addPlayer should generate a new player 0 wins", function() {

    assert.equal(players[newID]["wins"], 0);

  });

  it("addPlayer should generate a new player with the correct inputted name", function() {

    assert.equal(players[newID]["name"], "Fitz");

  });

});

describe("Game Manipulation", function() {

  let games = {
    w1e2r3t4y6u7: {
      players: ["a1b2c3d4e5f6", "0x00"],
      winner: "No Winner Yet",
      smartComputer: false,
      amountOfShips: 5,
      shotsPerTurn: 1,
      boardSize: 10,
      ships: {
        a1b2c3d4e5f6: {},
        0x00: {},
        addShip: battleshipFunctions.addShip
      },
      shots: {
        a1b2c3d4e5f6: [],
        0x00: [],
        makeShot: battleshipFunctions.makeShot,
        incrementTurnCount: battleshipFunctions.incrementTurnCount,
        turnCount: 0
      },
    },
    addGame: battleshipFunctions.addGame
  };

  games.addGame(newID, "0x00", true, 5, 1, 12);

  let newGameID = _.findKey(games, ["players", [newID, "0x00"]]);

  it("addGame should generate a new game with a unique 12 digit ID", function() {

    assert.isTrue(newGameID.length === 12);

  });

  it("addGame should generate a new game with the correct players", function() {

    assert.deepEqual(games[newGameID].players, [newID, "0x00"]);

  });

  it("addGame should generate a new game with the correct computer difficulty", function() {

    assert.isTrue(games[newGameID].smartComputer);

  });

  it("addGame should generate a new game with the correct ship count", function() {

    assert.equal(games[newGameID].amountOfShips, 5);

  });

  it("addGame should generate a new game with the correct turn count", function() {

    assert.equal(games[newGameID].shotsPerTurn, 1);

  });

  it("addGame should generate a new game with the correct board size", function() {

    assert.equal(games[newGameID].boardSize, 12);

  });

});