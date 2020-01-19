const { UniqueThing } = require("./unique");

class Game extends UniqueThing {

  constructor(players, options) {
    super();
    this.players = players;
    this.winner = "No Winner Yet";
    this.options = options;
  }

  get ships() {
    let shipObject = {
      [this.players[0]]: [],
      [this.players[1]]: []
    };
    return shipObject;
  }

}

let games = {
  addGame: function(players, options) {

    let newGame = new Game(players, options);
    let newGameUid = newGame.uid;
    games[newGameUid] = newGame;
  },
};

module.exports = { Game, games };


/*
  getGameList: function(playerId) {
    //takes a userID and returns an array of all the gameIDs they've played
    //start with empty game list
    let gameList = [];
  
    //Loop through games
    for (const game in this) {

      //wrap with a check to see if game.player exists (for when there are no records of games)
      //if either playerID matches, push the game ID to the list
      if (game.player !== undefined) {
        if ((game.players[0] === playerId) || (game.players[1] === playerId)) {
          gameList.push(game);
        }
      }
    }
    return gameList;
  }

    this[newGameId] = {

      takeTurn: function(coordinate) {
        let currentTurn = currentGame.currentTurn;
        let currentPlayer = currentGame.currentPlayer;

        //log the shot into the game record
        games[newGameId].shots[currentPlayer].push(coordinate);
        
        //increments turns in all the appropriate places
        if (currentTurn[1] === 0) {
          currentTurn[1]++;
        } else {
          currentTurn[0]++;
          currentTurn[1]--;
          this.shots.turnsCompleted++;
        }
        
        //changes current player
        currentGame.currentPlayer = getOpponentId(currentPlayer, newGameId);
      }
    };
    */