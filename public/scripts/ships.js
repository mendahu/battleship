const { UniqueThing } = require("./unique");
const { isValidCoord } = require('./helpers');
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
    //
  }
}

let ships = {
  
  addShip: function(gameId, playerId, shipClass, coord, direction) {
    if (isValidCoord(coord, games[gameId].options.boardSize)) {
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
      
      //checks if coordinates would go off the board or cover another ship
      let occupiedTiles = getOccupiedTiles(coordinate, direction, getShipSize(shipClass), games[newGameId].boardSize);
      let freeSpace = true;
      
      if (occupiedTiles) {
        //loops over over each coordinate new ship would occupy
        occupiedTiles.forEach(element => {
          //sets freeSpace to false if there is already a ship there
          if (isOccupied(newGameId, playerUID, element)) {
            freeSpace = false;
          }
        });
      }
      
      //new ship Id
      let newShipId = generateUid();
      
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