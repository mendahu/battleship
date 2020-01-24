const { UniqueThing } = require("./unique");

//Player class for creating new players
class Player extends UniqueThing {

  constructor(name, email, password, uid) {
    super();
    if (uid) {
      this.uid = uid;
    }
    this.name = name;
    this.email = email;
    this.wins = 0;
  }

  get games() {
    let gameList = [];
    /*
    for (const game in games) {
      let players = games[game].players;
      if (players) {
        if (players[0] === this.uid || players[1] === this.uid) {
          gameList.push(game);
        }
      }
    }
    */
    return gameList;
  }
}



module.exports = { Player };