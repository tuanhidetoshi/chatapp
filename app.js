var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let connectCounter = 0;

io.on("connection", socket => {
  connectCounter++;
  io.emit("welcome", connectCounter);
  socket.on("disconnect", () => {
    connectCounter--;
    io.emit("disconnect", connectCounter);
  });
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
