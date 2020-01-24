const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');

const { players } = require('../scripts/data');

//Sets test code up using real functions to simulate actual game experience
players.addPlayer("Computer", "computer@test.com", "password", "0x00");
players.addPlayer("Fitz", "fitz@test.com", "chonker");
players.addPlayer("Juno", "juno@test.com", "spoon");
let testIdFitz = _.findKey(players, ["name", "Fitz"]);
let testIdJuno = _.findKey(players, ["name", "Juno"]);

describe("03 - Player Creation", function() {

  it("addPlayer should generate a new player with a unique 12 digit ID", function() {

    assert.isTrue(testIdFitz.length === 12);
  });

  it("addPlayer should generate a computer player with the unique ID 0x00", function() {

    assert.equal("0x00", players["0x00"].uid);
  });

  it("addPlayer should generate a computer player with the name Computer", function() {

    assert.equal("Computer", players["0x00"].name);
  });

  it("addPlayer should generate a new player whose UID matches", function() {

    assert.equal(testIdFitz, players[testIdFitz].uid);
  });
  
  it("addPlayer should generate a new player with correct email", function() {
    
    assert.equal(players[testIdFitz].email, "fitz@test.com");
  });

  it("addPlayer should generate a new player with the correct inputted name", function() {

    assert.equal(players[testIdJuno]["name"], "Juno");
  });

  it("addPlayer should generate a new player with an empty game array", function() {

    assert.equal(players[testIdJuno]["games"].length, 0);
  });
});

module.exports = { testIdFitz, testIdJuno };