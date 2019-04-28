import axios from "axios";

export function syncSongs() {
  axios.get("/sync-songs").then(async res => {
    const songs = res.data.songs.songs;
    if (songs.length) {
      //clear collection
      await window.dbPromise.then(db => {
        var tx = db.transaction("songs", "readwrite");
        var store = tx.objectStore("songs");
        store.clear();
        return tx.complete;
      });

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
    }
  });
}
