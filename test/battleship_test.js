const chai = require('chai');
const assert = chai.assert;

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

  it("boardValidator should return true if a coordinate is in the board", function() {

    assert.isTrue(battleshipFunctions.boardValidator("d4"));

  });

  it("boardValidator should return false if a coordinate is off the board", function() {

    assert.isFalse(battleshipFunctions.boardValidator("d11"));

  });

  it("boardValidator should return false if a coordinate is off the board", function() {

    assert.isFalse(battleshipFunctions.boardValidator("q3"));

  });

  it("generateRow should return a row of coordinates equal to the size passed through", function() {

    const row = battleshipFunctions.generateRow("d4", 5);

    assert.deepEqual(row, ["d4", "d5", "d6", "d7", "d8"]);

  });

  it("generateRow should return false if the row would push over the edge of the board", function() {

    const row = battleshipFunctions.generateRow("d7", 5);

    assert.isFalse(row);

  });

});