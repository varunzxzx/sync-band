export function syncSongs(songs) {
  if (songs.length) {
    return new Promise((res, rej) => {
      const promises = [];
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
