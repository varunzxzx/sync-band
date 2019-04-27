import openSocket from "socket.io-client";
import axios from "axios";
import { navigate } from "@reach/router";
const socket = openSocket("/");

function doesRoomExists(changeSongHandler) {
  socket.on("leave", function() {
    alert("Room owner left the room.");
    navigate("/");
  });

  socket.on("change-song", function(song) {
    changeSongHandler(song);
  });

  return axios.get("/does-room-exists");
}

function createRoom() {
  socket.emit("create-room");
}

function changeSong(song) {
  socket.emit("change-song", song);
}

export { doesRoomExists, createRoom, changeSong };
