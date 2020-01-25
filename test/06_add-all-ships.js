const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');
const { testGameId, testIdFitz } = require('./05_ship-creation');

const { generateUid } = require('../scripts/unique');
const { ships, games, players } = require('../scripts/data');
const helperFunctions = require('../scripts/helpers');

ships.addShip(testGameId, testIdFitz, "cruiser", "g6", "horizontal");
ships.addShip(testGameId, testIdFitz, "submarine", "d1", "horizontal");
ships.addShip(testGameId, testIdFitz, "battleship", "b6", "vertical");
//ships.addShip(testGameId, testIdFitz, "carrier", "f7", "horizontal");

//ships.addShip(testGameId, "0x00", "patrol", "a10", "horizontal");
ships.addShip(testGameId, "0x00", "cruiser", "h7", "horizontal", "0x00");
ships.addShip(testGameId, "0x00", "submarine", "d10", "horizontal");
ships.addShip(testGameId, "0x00", "battleship", "g2", "vertical");
ships.addShip(testGameId, "0x00", "carrier", "e1", "vertical");

describe("06 - Add All Ships", function() {
  
  it("addShip should not add a ship if the max ship size has been reached", function() {
    
    ships.addShip(testGameId, testIdFitz, "cruiser", "g10", "horizontal", "testTooManyShipId");
    
    assert.equal(ships["testTooManyShipId"], undefined);
    
  });

});
