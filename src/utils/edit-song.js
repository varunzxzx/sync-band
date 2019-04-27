export function editSong(song, cb) {
  window.dbPromise
    .then(function(db) {
      var tx = db.transaction("songs", "readwrite");
      var store = tx.objectStore("songs");
      store.put(song, song.id);
      return tx.complete;
    })
    .then(function() {
      cb(null, "Song updated successfully!");
    })
    .catch(err => {
      cb(err);
    });
}
