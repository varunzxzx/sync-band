import openSocket from "socket.io-client";
import axios from "axios";
import { navigate } from "@reach/router";
import { syncSongs } from "./utils";

const url = window.ip
  ? window.ip
  : "https://ec2-54-158-171-186.compute-1.amazonaws.com:8080";

const socket = openSocket(url);

function sync(songs) {
  socket.emit("sync-songs", songs);

  socket.on("sync-songs", res => {
    syncSongs(res.songs);
  });
}

function doesRoomExists(changeSongHandler, songs) {
  sync(songs);

  socket.on("leave", function() {
    alert("Room owner left the room.");
    navigate("/");
  });

  socket.on("change-song", function(song) {
    changeSongHandler(song);
  });

  return axios.get(url + "/does-room-exists");
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
