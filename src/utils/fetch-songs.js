export function fetchSongs(cb) {
  window.dbPromise
    .then(function(db) {
      var tx = db.transaction("songs", "readonly");
      var store = tx.objectStore("songs");
      return store.getAll();
    })
    .then(songs => {
      cb(null, songs);
    })
    .catch(err => cb(err));
}
