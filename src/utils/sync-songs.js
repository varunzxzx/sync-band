import axios from "axios";

export function syncSongs() {
  const url = window.ip
    ? window.ip
    : "http://ec2-54-158-171-186.compute-1.amazonaws.com:8080";
  axios.get(url + "/sync-songs").then(async res => {
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
            window.location.reload();
          })
          .catch(err => {
            alert("Something went wrong while syncing songs");
            console.log(err);
          });
      });
    }
  });
}
