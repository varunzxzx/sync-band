const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

let roomOwnerId = null;

app.get("/does-room-exists", (req, res) => {
  const data = roomOwnerId ? true : false;
  return res.status(200).send(data);
});

io.on("connection", function(socket) {
  socket.on("create-room", function() {
    roomOwnerId = socket.id;
    console.log("Room owner added", socket.id);
  });

  socket.on("change-song", function(song) {
    socket.broadcast.emit("change-song", song);
  });

  socket.on("disconnect", function() {
    if (socket.id === roomOwnerId) {
      console.log("Room owner left");
      roomOwnerId = null;
      socket.broadcast.emit("leave");
    }
  });
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "build/index.html");
});

server.listen(8000);
console.log("Server started!! at 8000");
