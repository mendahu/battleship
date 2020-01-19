const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("Battleship Server Running!");
});

app.get("/", (req, res) => {
  res.send("Welcome to Battleship");
});