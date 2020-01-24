const chai = require('chai');
const assert = chai.assert;
const { testIdFitz } = require('./03_player-creation');
const { games, players } = require('../scripts/data');

//Sets test code up using real functions to simulate actual game experience
let testOptions = { smartPC: true, shipCount: 5, shotsPerTurn: 1, boardSize: 12 };
let testGameId = "test1234test";
let testPlayer1 = players[testIdFitz];
let testPlayer2 = players["0x00"];
games.addGame(testPlayer1, testPlayer2, testOptions, testGameId);

describe("04 - Game Creation", function() {
  
  it("addGame should generate a new game with a unique 12 digit ID", function() {
    
    assert.isTrue(testGameId.length === 12);
  });
  
  it("addGame should generate a new game with the correct players", function() {
    
    assert.deepEqual(games[testGameId].players, [testPlayer1, testPlayer2]);
  });
  
  it("addGame should generate a new game with the correct computer difficulty", function() {
    
    assert.isTrue(games[testGameId].options.smartPC);
  });
  
  it("addGame should generate a new game with the correct ship count", function() {
    
    assert.equal(games[testGameId].options.shipCount, 5);
  });
  
  it("addGame should generate a new game with the correct turn count", function() {
    
    assert.equal(games[testGameId].options.shotsPerTurn, 1);
  });
  
  it("addGame should generate a new game with the correct board size", function() {
    
    assert.equal(games[testGameId].options.boardSize, 12);
  });
  
  it("getOpponentId should take one playerID and return their opponent given a game ID", function() {
    
    assert.equal(games[testGameId].getOpponentId(testIdFitz), "0x00");
  });
    
  it("players should now report a game on their record", function() {
    
    assert.equal(players[testIdFitz].games.length, 1);
  });
});

module.exports = { testGameId, testIdFitz };