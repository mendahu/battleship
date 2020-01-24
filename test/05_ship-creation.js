const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');
const { testGameId, testIdFitz } = require('./04_game-creation');

const { ships, games } = require('../scripts/data');

//test code to create a ship
ships.addShip(testGameId, testIdFitz, "patrol", "a4", "vertical");
const testShipId = _.findKey(ships, ["class", "patrol"]);
let testShip = ships[testShipId];

describe("05 - Ship Adder", function() {
  
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
    
    assert.deepEqual(testShip.tiles , ["a4", "a5"]);
    
  });
  
  it("addShip should not create a ship if any ship tiles roll off the board", function() {

    ships.addShip(testGameId, testIdFitz, "frigate", "b10", "vertical", "testBadShip");

    assert.equal(games[testGameId].ships[testIdFitz]["testBadShip"], undefined);
  });
  
  it("games.isOccupied should report true when checking if an occupied tile is occupied", function() {
    
    assert.isTrue(games[testGameId].isOccupied(testIdFitz, "a4"));
    
  });
  
  it("games.areOccupied should report true when checking an array of coordinates of a ship", function() {
    
    assert.isFalse(games[testGameId].areOccupied(testIdFitz, "a4"));
    
  });
  
  it("addShip should not create a ship if a coordinate covers another ship", function() {
    
    ships.addShip(testGameId, testIdFitz, "destroyer", "a3", "vertical", "testOverlapShipId");
  
    assert.equal(ships["testOverlapShipId"], undefined);
    
  });

});

module.exports = { testGameId, testIdFitz };