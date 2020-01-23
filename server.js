const express = require('express');
const app = express();
const port = 3000;


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static('public'));

// 404 Catch
app.get(function(req, res) {
  let errorCode = 404;
  res.status(404);
  res.render("error", { errorCode });
});

app.listen(port, () => {
  console.log("Battleship Server Running!");
});