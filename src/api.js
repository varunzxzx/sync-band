import openSocket from "socket.io-client";
import axios from "axios";
import { navigate } from "@reach/router";
const socket = openSocket("/");

function doesRoomExists(changeSongHandler, songs) {
  socket.on("leave", function() {
    alert("Room owner left the room.");
    navigate("/");
  });

  socket.on("change-song", function(song) {
    changeSongHandler(song);
  });

  socket.emit("sync-songs", songs);

  return axios.get("/does-room-exists");
}

function createRoom() {
  socket.emit("create-room");
}

function changeSong(song) {
  socket.emit("change-song", song);
}

function exitRoom() {
  socket.emit("leave");
}

export { doesRoomExists, createRoom, changeSong, exitRoom };
