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