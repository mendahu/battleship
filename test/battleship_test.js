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

    assert.isTrue(battleshipFunctions.boardValidator("d4", 10));

  });

  it("boardValidator should return false if a coordinate is off the board", function() {

    assert.isFalse(battleshipFunctions.boardValidator("d11", 10));

  });

  it("boardValidator should return false if a coordinate is off the board", function() {

    assert.isFalse(battleshipFunctions.boardValidator("l3",  10));

  });

  it("generateRow should return a row of coordinates equal to the size passed through", function() {

    const row = battleshipFunctions.generateRow("d4", 5, 10);

    assert.deepEqual(row, ["d4", "e4", "f4", "g4", "h4"]);

  });

  it("generateRow should return false if the row would push over the edge of the board", function() {

    const row = battleshipFunctions.generateRow("g4", 5, 10);

    assert.isFalse(row);

  });


  it("getNthLetterFrom should return number of letters further down the alphabet", function() {

    const letterCheck = battleshipFunctions.getNthLetterFrom("a", 2);

    assert.equal(letterCheck, "c");

  });

  it("generateColumnn should return a row of coordinates equal to the size passed through", function() {

    const column = battleshipFunctions.generateColumn("d4", 5, 10);

    assert.deepEqual(column, ["d4", "d5", "d6", "d7", "d8"]);

  });

  it("generateColumn should return false if the column would push over the edge of the board", function() {

    const column = battleshipFunctions.generateColumn("h8", 5, 10);

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

  it("addGame should set currentGame to new Id", function() {

    assert.equal(testGameId, battleshipFunctions.currentGame["gameId"]);

  });

  it("addGame should set currentGame players to correct players", function() {

    assert.deepEqual([testIdFitz, "0x00"], battleshipFunctions.currentGame["players"]);

  });

  it("addGame should set currentGame turn to [0, 0]", function() {

    assert.deepEqual([0, 0], battleshipFunctions.currentGame["currentTurn"]);

  });

  it("addGame should set currentGame currentPlayer to first player id", function() {

    assert.equal(testIdFitz, battleshipFunctions.currentGame["currentPlayer"]);

  });

});

games[testGameId].ships.addShip("patrol", "a4", "vertical", testIdFitz);

const testShipId = _.findKey(games[testGameId].ships[testIdFitz], ["class", "patrol"]);

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
    
    assert.deepEqual(testShip.occupiedTiles , ["a4", "a5"]);
    
  });
  
  it("addShip should not create a ship if a coordinate would go off the board", function() {
    
    games[testGameId].ships.addShip("battleship", "j4", "horizontal", testIdFitz);
    
    let ships = Object.keys(games[testGameId].ships[testIdFitz]);

    assert.equal(ships.length, 1);
    
  });
  
  it("addShip should not create a ship if a coordinate covers another ship", function() {
    
    games[testGameId].ships.addShip("battleship", "a3", "vertical", testIdFitz);
    
    let ships = Object.keys(games[testGameId].ships[testIdFitz]);

    assert.equal(ships.length, 1);

  });
  
  it("addShip should create a new ship with the correct healthy status", function() {

    assert.isTrue(testShip.status);

  });

  
});

describe("Add All Ships", function() {
  
  it("addShip should not add a ship if the max ship size has been reached", function() {
    
    games[testGameId].ships.addShip("cruiser", "g6", "horizontal", testIdFitz);
    games[testGameId].ships.addShip("submarine", "d1", "horizontal", testIdFitz);
    games[testGameId].ships.addShip("battleship", "b6", "vertical", testIdFitz);
    games[testGameId].ships.addShip("carrier", "f7", "horizontal", testIdFitz);
    
    games[testGameId].ships.addShip("patrol", "a10", "horizontal", "0x00");
    games[testGameId].ships.addShip("cruiser", "h7", "horizontal", "0x00");
    games[testGameId].ships.addShip("submarine", "d10", "horizontal", "0x00");
    games[testGameId].ships.addShip("battleship", "g2", "vertical", "0x00");
    games[testGameId].ships.addShip("carrier", "e1", "vertical", "0x00");
    
    games[testGameId].ships.addShip("cruiser", "g10", "horizontal", testIdFitz);

    let ships = Object.keys(games[testGameId].ships[testIdFitz]);

    assert.equal(ships.length, 5);

  });

});

let currentGame = battleshipFunctions.currentGame;
let currGameShots = games[testGameId].shots;

describe("Take a Turn", function() {
  
  it("takeTurn should log the shot in the game table", function() {
  
    games[testGameId].takeTurn("i1");

    assert.equal(currGameShots[testIdFitz][0], "i1");
  
  });
  
  it("takeTurn should increment the player order when a shot is taken", function() {

    assert.isTrue(currentGame.currentTurn[1] === 1);

  });

  it("takeTurn should change the current player when a shot is taken", function() {

    assert.isTrue(currentGame.currentPlayer === "0x00");

  });

  it("takeTurn should NOT increment the turn count when a shot is taken in the first half of a turn", function() {

    assert.isTrue(currentGame.currentTurn[0] === 0);

  });

});