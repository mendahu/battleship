const { UniqueThing } = require("./unique");
const { getOccupiedTiles } = require('./helpers');

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

module.exports = { Ship, shipLibrary };
