const { UniqueThing } = require("./unique");
const { isValidCoord, getOccupiedTiles, areValidTiles } = require('./helpers');
const { games } = require('./games');

//A library of ship size definitions
let shipLibrary = {
  carrier: 5,
  battleship: 4,
  submarine: 3,
  cruiser: 3,
  patrol: 2
};

//Ship class for creating new ships
class Ship extends UniqueThing {

  constructor(gameId, playerId, shipClass, coord, direction) {
    super();
    this.gameId = gameId;
    this.playerId = playerId;
    this.class = shipClass;
    this.coordinate = coord;
    this.direction = direction;
  }

  get size() {
    return shipLibrary[this.class];
  }

  get tiles() {
    return getOccupiedTiles(this.coordinate, this.direction, this.size);
  }
}

let ships = {
  
  //Adds a new ship to the database
  addShip: function(gameId, playerId, shipClass, coord, direction) {

    let boardSize = games[gameId].options.boardSize;

    let occupiedTiles = getOccupiedTiles(coord, direction, shipLibrary[shipClass]);
    let validTiles = areValidTiles(occupiedTiles, boardSize);

    let freeSpace = true;

    //confirms that the ship position is on the board first
    if (validTiles && freeSpace) {

      //creates new ship
      let newShip = new Ship(gameId, playerId, shipClass, coord, direction);
      let newShipId = newShip.uid;
      ships[newShipId] = newShip;
    }
  }
};

module.exports = { Ship, ships };

/*

    this[newGameId]["ships"]["addShip"] = function(shipClass, coordinate, direction, playerUID) {
      
      //checks if we have reached max ship amount
      let shipQuantity = Object.keys(games[newGameId]["ships"][playerUID]).length;
      if (shipQuantity >= games[newGameId].amountOfShips) {
        return;
      }
      
      //verifies that ship position if valid before adding new ship
      if (occupiedTiles && freeSpace) {
        this[playerUID][newShipId] = {
          class: shipClass,
          size: getShipSize(shipClass),
          coordinate: coordinate,
          direction: direction,
          occupiedTiles: occupiedTiles,
          status: true
        };
      }
    },
    */