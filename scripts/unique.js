//returns an 12-digit unique ID for use with games, users, and ships
const generateUid = function() {
  return Math.floor((1 + Math.random()) * 0x1000000000000).toString(16).substring(1);
};

//Base class for any unique object like a player, a game, a ship or a board
class UniqueThing {

  constructor() {
    this.uid = generateUid();
  }
}

module.exports = { generateUid, UniqueThing };