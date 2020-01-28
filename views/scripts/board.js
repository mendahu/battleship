$(document).ready(function() {
  
  $(".board-tile").click(function(event) {
    const clickedDiv = (event.target);
    const coordinate = clickedDiv.id[11] + clickedDiv.id[12];
    drawShip(coordinate);
  });
});

const getShip = function() {
  const shipElement = $(".list-group-item.active");
  return shipElement.attr("value");
};
  
const getOrientation = function(ship) {
  const orientation = $(`[name="${ship}-orientation"]:checked`).attr("value");
  return orientation;
};
  
const drawShip = function(coordinate) {

  const ship = getShip();
  const orientation = getOrientation(ship);
  const row = Number(coordinate.slice(1)) + 1;
  const col = coordinate.charCodeAt(0) - 95;

  const existingShip = $(`#draw-${ship}`);

  if (existingShip) {
    existingShip.remove();
  }

  const boardSize = $("#board-placement").attr("data-board-size");
  console.log($("#board-placement"));
  console.log(boardSize);

  $.post("shipcheck", { ship, orientation, coordinate, boardSize }, function(data) {
    return data;
  })
    .done(function(data) {
      const size = data.size;

      if (data.isAllowed) {
        (orientation === "horizontal")
          ? $("#board-placement").append(`<img src="../assets/${ship}.svg" class="drawn-ship" data-coordinate="${coordinate}" data-orientation="${orientation}" data-class="${ship}" alt="${ship} image" id="draw-${ship}" style="grid-area: ${row} / ${col} / span 1 / span ${size}; z-index: 2;">`)
          : $("#board-placement").append(`<img src="../assets/${ship}-v.svg" class="drawn-ship" data-coordinate="${coordinate}" data-orientation="${orientation}" data-class="${ship}" alt="${ship} image" id="draw-${ship}" style="grid-area: ${row} / ${col} / span ${size} / span 1; z-index: 2;">`);
      }
    });
  

  //const tilesAreEmpty = !games[gameId].areOccupied(playerId, occupiedTiles);


};
