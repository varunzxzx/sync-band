import openSocket from "socket.io-client";
import axios from "axios";
import { navigate } from "@reach/router";
import { syncSongs } from "./utils";

const url = window.ip ? window.ip : "https://sync-band.openode.io";

const socket = openSocket(url);

function getUserCount() {
  socket.emit("user_count");
}

function syncSongsWithServer(songs, changeUserCount) {
  socket.on("user_count", function(user_count) {
    changeUserCount(user_count);
  });

  return new Promise((resolve, reject) => {
    socket.emit("sync-songs", songs);

    socket.on("sync-songs", async res => {
      await syncSongs(res.songs);
      resolve();
    });
  });
}

function doesRoomExists(changeSongHandler) {
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

export {
  doesRoomExists,
  createRoom,
  changeSong,
  exitRoom,
  syncSongsWithServer,
  getUserCount
};
