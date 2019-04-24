export function addSong(song, cb) {
  window.dbPromise
    .then(function(db) {
      var tx = db.transaction("songs", "readwrite");
      var store = tx.objectStore("songs");
      store.add(song, song.id);
      return tx.complete;
    })
    .then(function() {
      cb(null, "Song added successfully!");
    })
    .catch(err => {
      cb(err);
    });
}
