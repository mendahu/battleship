const { generateUid } = require('../public/scripts/helpers.js');

//Base class for any unique object like a player, a game, a ship or a board
class UniqueThing {

  constructor() {
    this.uid = generateUid();
  }
}

module.exports = { UniqueThing };