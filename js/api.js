const base_url = "https://api.football-data.org/v2/";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getStandings() {
  return new Promise(function (resolve, reject) {
    fetch(`${base_url}competitions/2003/standings`, {
    headers: {
      "X-Auth-Token": '9f0de7ac9c3643218e09a26de1d081a3'
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      let standingsHTML = "";
      data.standings[0].table.forEach(function(team) {
        standingsHTML += `
          <div class="card">
            <a href="./standing.html?id=${team.team.id}">
              <div class="card-image waves-effect waves-block waves-light">
                  <img src="${team.team.crestUrl}" alt="Logo ${team.team.name}"/>
              </div>
            </a>
            <div class="card-content">
              <span class="card-title truncate">${team.team.name}</span>
              <p>Matches played: ${team.playedGames}</p>
            </div>
          </div>
        `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = standingsHTML;
      resolve(data);
    })
    .catch(error);
  }
)}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    fetch(`${base_url}teams/${idParam}`, {
    headers: {
      "X-Auth-Token": '9f0de7ac9c3643218e09a26de1d081a3'
    }
  })
    .then(status)
    .then(json)
    .then((data) => {
      console.log(data);
      let teamHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
            <img src="${data.crestUrl}" alt="Logo ${data.name}"/>
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              ${snarkdown(data.website)}
            </div>
          </div>
        `;
      document.getElementById("body-content").innerHTML = teamHTML;
      resolve(data);
    });
})}

function getSavedTeams() {
  return new Promise(function (resolve, reject) {
  getAll().then(function(standings) {
      console.log(standings);
      // Menyusun komponen card artikel secara dinamis
      let standingsHTML = "";
      standings.forEach(function (team) {
        standingsHTML += `
                    <div class="card">
                      <a href="./standing.html?id=${team.id}&saved=true">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${team.crestUrl}" alt="Logo ${team.name}"/>
                        </div>
                      </a>
                    </div>
                  `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #body-content
      document.getElementById("saved").innerHTML = standingsHTML;
    });
  })
}

function getSavedTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(idParam).then(function(data){
    teamHTML = '';
    var teamHTML = `
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
        <img src="${data.crestUrl}" alt="Logo ${data.name}"/>
        </div>
        <div class="card-content">
          <span class="card-title">${data.name}</span>
          ${snarkdown(data.website)}
        </div>
      </div>   
    `;
    //Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}