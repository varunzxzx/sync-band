const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

/* Require .env */
const dotenv = require("dotenv");
dotenv.config();

const PORT = parseInt(process.env.NODE_PORT) || 80;

let roomOwnerId = null;

function cleanRoom(socket) {
  console.log("Room owner left");
  roomOwnerId = null;
  socket.broadcast.emit("leave");
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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

  socket.on("leave", function() {
    if (socket.id === roomOwnerId) {
      cleanRoom(socket);
    }
  });

  socket.on("disconnect", function() {
    if (socket.id === roomOwnerId) {
      cleanRoom(socket);
    }
  });

  socket.on("sync-songs", function(clientSongs) {
    fs.readFile("songs.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const obj = JSON.parse(data); //now it an object

        const { songs } = obj;
        clientSongs.forEach(clientSong => {
          const index = songs.findIndex(e => e.id === clientSong.id);
          if (index === -1) {
            songs.push(clientSong);
          } else {
            songs[index] = clientSong;
          }
        });
        obj["songs"] = songs;
        socket.emit("sync-songs", obj);
        const json = JSON.stringify(obj); //convert it back to json
        fs.writeFile("songs.json", json, "utf8", () => {}); // write it back
      }
    });
  });
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(PORT);
console.log("Server started!! at " + PORT);
