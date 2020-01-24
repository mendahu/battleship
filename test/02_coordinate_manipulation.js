const chai = require('chai');
const assert = chai.assert;

const helperFunctions = require('../scripts/helpers');

describe("02 - Cordinate Manipulation", function() {

  it("isValidCoord should return true if a coordinate is in the board", function() {

    assert.isTrue(helperFunctions.isValidCoord("d4", 10));
  });

  it("isValidCoord should return false if a row is off the board", function() {

    assert.isFalse(helperFunctions.isValidCoord("d11", 10));
  });

  it("isValidCoord should return false if a column is off the board", function() {

    assert.isFalse(helperFunctions.isValidCoord("l3",  10));
  });

  it("generateRow should return a row of coordinates equal to the size passed through", function() {

    const row = helperFunctions.generateRow("d4", 5);

    assert.deepEqual(row, ["d4", "e4", "f4", "g4", "h4"]);
  });

  it("getNthLetterFrom should return number of letters further down the alphabet", function() {

    const letterCheck = helperFunctions.getNthLetterFrom("a", 2);

    assert.equal(letterCheck, "c");
  });

  it("generateColumnn should return a column of coordinates equal to the size passed through", function() {

    const column = helperFunctions.generateColumn("d4", 5);

    assert.deepEqual(column, ["d4", "d5", "d6", "d7", "d8"]);
  });

  it("areValidTiles should return false if any tiles are off the board", function() {

    assert.isFalse(helperFunctions.areValidTiles(["d7", "d8", "d9", "d10", "d11"], 10));
  });
});