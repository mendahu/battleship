$(document).ready(function() {
  
  $(".board-tile").click(function(event) {
    const clickedDiv = (event.target);
    const coordinate = clickedDiv.id[11] + clickedDiv.id[12];
    drawShip(coordinate);
  });
});

const getShip = function() {
  const shipElement = $(".list-group-item.active");
  return [shipElement.attr("value"), shipElement.attr("data-size")];
};
  
const getOrientation = function(ship) {
  const orientation = $(`[name="${ship}-orientation"]:checked`).attr("value");
  return orientation;
};
  
const drawShip = function(coordinate) {

  const shipData = getShip();
  const ship = shipData[0];
  const size = shipData[1];
  const orientation = getOrientation(ship);
  const row = Number(coordinate[1]) + 1;
  const col = coordinate.charCodeAt(0) - 95;

  const existingShip = $(`#draw-${ship}`);

  if (existingShip) {
    existingShip.remove();
  }



  (orientation === "horizontal")
    ? $("#board-placement").append(`<img src="../assets/${ship}.svg" alt="${ship} image" id="draw-${ship}" style="grid-area: ${row} / ${col} / span 1 / span ${size}; z-index: 2;"`)
    : $("#board-placement").append(`<img src="../assets/${ship}.svg" alt="${ship} image" id="draw-${ship}" style="grid-area: ${row} / ${col} / span ${size} / span 1; z-index: 2;"`);
  
};
