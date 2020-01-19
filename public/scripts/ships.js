const { UniqueThing } = require("./unique");

//Ship class for creating new ships
class Ship extends UniqueThing {

  constructor(name) {
    super();
  }
}

let ships = {
  
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