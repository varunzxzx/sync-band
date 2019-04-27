import axios from "axios";

export function syncSongs() {
  axios.get("/sync-songs").then(res => {
    const songs = res.data.songs.songs;
    if (songs.length) {
      songs.forEach(song => {
        window.dbPromise
          .then(function(db) {
            var tx = db.transaction("songs", "readwrite");
            var store = tx.objectStore("songs");
            store.add(song, song.id);
            return tx.complete;
          })
          .then(function() {
            console.log("Song added successfully!");
          })
          .catch(err => {
            console.log(err);
          });
      });
      window.location.href = "/";
    }
  });
}
