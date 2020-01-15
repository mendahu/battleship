const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');

const battleshipFunctions = require('../battleship.js');

let players = battleshipFunctions.players;
let games = battleshipFunctions.games;

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

players.addPlayer("Fitz");
players.addPlayer("Juno");

let testIdFitz = _.findKey(players, ["name", "Fitz"]);
let testIdJuno = _.findKey(players, ["name", "Juno"]);

describe("Player Creation", function() {

  it("addPlayer should generate a new player with a unique 12 digit ID", function() {

    assert.isTrue(testIdFitz.length === 12);

  });

  it("addPlayer should generate a new player with an empty array of games", function() {

    assert.deepEqual(players[testIdFitz]["games"], []);

  });

  it("addPlayer should generate a new player 0 wins", function() {

    assert.equal(players[testIdFitz]["wins"], 0);

  });

  it("addPlayer should generate a new player with the correct inputted name", function() {

    assert.equal(players[testIdJuno]["name"], "Juno");

  });

});

games.addGame(testIdFitz, "0x00", true, 5, 1, 12);

let testGameId = _.findKey(games, ["players", [testIdFitz, "0x00"]]);

describe("Game Creation", function() {

  it("addGame should generate a new game with a unique 12 digit ID", function() {

    assert.isTrue(testGameId.length === 12);

  });

  it("addGame should generate a new game with the correct players", function() {

    assert.deepEqual(games[testGameId].players, [testIdFitz, "0x00"]);

  });

  it("addGame should generate a new game with the correct computer difficulty", function() {

    assert.isTrue(games[testGameId].smartComputer);

  });

  it("addGame should generate a new game with the correct ship count", function() {

    assert.equal(games[testGameId].amountOfShips, 5);

  });

  it("addGame should generate a new game with the correct turn count", function() {

    assert.equal(games[testGameId].shotsPerTurn, 1);

  });

  it("addGame should generate a new game with the correct board size", function() {

    assert.equal(games[testGameId].boardSize, 12);

  });

  it("getOpponentId should take one playerID and return their opponent given a game ID", function() {

    assert.equal(battleshipFunctions.getOpponentId(testIdFitz, testGameId), "0x00");

  });


});

games[testGameId].ships.addShip("patrol", "a4", "vertical", testIdFitz);

let testShipId = _.findKey(games[testGameId].ships[testIdFitz], ["class", "patrol"]);

console.log(games[testGameId].ships);

let testShip = games[testGameId].ships[testIdFitz][testShipId];

describe("Ship Adder", function() {
  
  it("addShip should create a new ship for a player with a unique 12 digit string ID", function() {

    assert.equal(testShipId.length, 12);

  });

  it("addShip should create a new ship with the right class", function() {

    assert.equal(testShip.class, "patrol");

  });

  it("addShip should create a new ship with the correct size", function() {

    assert.equal(testShip.size, 2);

  });

  it("addShip should create a new ship with the correct starting coordinate", function() {

    assert.equal(testShip.coordinate, "a4");

  });

  it("addShip should create a new ship with the correct direction", function() {

    assert.equal(testShip.direction , "vertical");

  });

  it("addShip should create a new ship with the correct occupied tiles", function() {

    assert.equal(testShip.occupiedTiles , ["a4", "b4"]);

  });

});