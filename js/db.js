const dbPromised = idb.open("bundesapp", 1, function(upgradeDb) {
    const teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    teamsObjectStore.createIndex("team_name", "team_name", { unique: false });
});

function saveForLater(team) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        console.log(team);
        store.put(team);
        return tx.complete;
    })
      .then(function() {
        console.log("Tim berhasil di simpan.");
    });
}

function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("teams", "readonly");
          let store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("teams", "readonly");
          let store = tx.objectStore("teams");
          return store.get(parseInt(id));
        })
        .then(function(team) {
          resolve(team);
        });
    });
}

function deleteById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised.
    then(function(db) {
      let tx = db.transaction('teams', 'readwrite');
      let store = tx.objectStore('teams');
      store.delete(parseInt(id));
      return tx.complete;
    }).then(function(team) {
      resolve(team);
      console.log('Tim berhasil dihapus!');
    });
  })
}