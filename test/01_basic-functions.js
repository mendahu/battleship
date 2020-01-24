const chai = require('chai');
const assert = chai.assert;

const { generateUid } = require('../scripts/unique');
const helperFunctions = require('../scripts/helpers');

describe("01 - Basic Functions", function() {

  it("generateUid() should return a twelve digit string", function() {

    const testID = generateUid();

    assert.isTrue(testID.length === 12 && typeof testID === "string");
  });

  it("getColumn should return the letter component of a coordinate", function() {

    const column = helperFunctions.getColumn("d4");

    assert.isTrue(column === "d");
  });

  it("getRow should return the Number component of a coordinate", function() {

    const row = helperFunctions.getRow("d4");

    assert.isTrue(row === 4);
  });
});
