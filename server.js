const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("Battleship Server Running!");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static('public'));

// 404
app.use(function(req, res, next) {
  res.status(404).send("Path or File not found.");
});