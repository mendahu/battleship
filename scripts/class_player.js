const { UniqueThing } = require("./unique");

//Player class for creating new players
class Player extends UniqueThing {

  //uid param is optional allowing you to override the uid instead of generating a random one as per the UniqueThing class
  constructor(name, email, password, uid) {
    super();
    if (uid) {
      this.uid = uid;
    }
    this.name = name;
    this.email = email;
    this.password = password;
    this.games = [];
  }

  associateGame(gameId) {
    this.games.push(gameId);
  }
}



module.exports = { Player };