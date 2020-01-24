const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

/*******************************
GET ROUTING
*******************************/

app.get("/", (req, res) => {
  res.render("public/welcome");
});


// 404 CATCH
app.use(function(req, res, next) {
  res.status(404).send("Path or File not found.");
});

app.listen(port, () => {
  console.log("Battleship Server Running!");
});