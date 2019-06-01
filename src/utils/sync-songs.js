export function syncSongs(songs) {
  if (songs.length) {
    return new Promise(async (res, rej) => {
      const promises = [];
      // clear store before adding to prevent updating
      await window.dbPromise.then(function(db) {
        var tx = db.transaction("songs", "readwrite");
        var store = tx.objectStore("songs");
        store.clear();
        return tx.complete;
      });
      songs.forEach(async song => {
        await window.dbPromise
          .then(function(db) {
            var tx = db.transaction("songs", "readwrite");
            var store = tx.objectStore("songs");
            store.add(song, song.id);
            promises.push(tx.complete);
            return tx.complete;
          })
          .catch(err => {
            alert("Something went wrong while syncing songs");
            console.log(err);
          });
      });
      Promise.all(promises).then(() => res());
    });
  }
}
