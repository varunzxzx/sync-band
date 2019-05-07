export async function syncSongs(songs) {
  if (songs.length) {
    songs.forEach(async song => {
      await window.dbPromise
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
          alert("Something went wrong while syncing songs");
          console.log(err);
        });
    });
  }
}
