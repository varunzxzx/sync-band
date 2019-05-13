const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");

/* Require .env */
const dotenv = require("dotenv");
dotenv.config();

const PORT = parseInt(process.env.NODE_PORT) || 80;

let roomOwnerId = null;
let user_count = 0;

function cleanRoom(socket) {
  console.log("Room owner left");
  roomOwnerId = null;
  socket.broadcast.emit("leave");
}

function changeUserCount(socket) {
  io.emit("user_count", user_count);
}

app.use(cors());

app.get("/does-room-exists", (req, res) => {
  const data = roomOwnerId ? true : false;
  return res.status(200).send(data);
});

io.on("connection", function(socket) {
  socket.on("user_count", function() {
    user_count++;
    changeUserCount(socket);
  });

  socket.on("create-room", function() {
    roomOwnerId = socket.id;
    console.log("Room owner added", socket.id);
  });

  socket.on("change-song", function(song) {
    socket.broadcast.emit("change-song", song);
  });

  // If user leaves intentionally
  socket.on("leave", function() {
    user_count--;
    changeUserCount(socket);

    if (socket.id === roomOwnerId) {
      cleanRoom(socket);
    }
  });
  // else
  socket.on("disconnect", function() {
    user_count--;
    changeUserCount(socket);

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
