document.getElementById("searchButton").addEventListener("click", function () {
  const searchTerm = document.getElementById("searchInput").value;
  const endpoint = `http://localhost:3000/api/youtube?search=${encodeURIComponent(searchTerm)}`;

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Muestra la respuesta en la consola

      // Aquí puedes manipular los datos y mostrarlos en la página como desees
      displayResults(data.results);
    })
    .catch(error => console.error('Error al obtener los datos:', error));
});


// Esta función muestra los resultados en la página en forma de tarjetas
function displayResults(data) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = ""; // Limpia el contenedor antes de mostrar nuevos resultados

  data.forEach(item => {
    resultsContainer.innerHTML += `
   <div class="col-md-4 card_animation">
      <div class="card mb-4 shadow-sm">
        <img class="card-img-top" src="${item.thumbnail}" alt="Card image cap">
        <div class="card-body">
          <a class="card_link" href="${item.extra.directLink}" target="_blank">
            <h5 class="card-title">${item.title}</h5>
          </a>
          <p class="card-text">${item.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">${calcMessageAge(item.published_at)}</small>
          </div>
        </div>
      </div>
    </div>`;
  })
}

function calcMessageAge(fireDate) {
  const date = Date.parse(fireDate);
  const now = Date.now();
  // in seconds
  const diff = Math.abs(date - now) / 1000;
  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 4 * week;
  const year = 12 * month;
  let num;
  let label;

  if (diff > year) {
    num = Math.floor(diff / year);
    label = num + ' year' + (num > 1 ? 's' : '');
  } else if (diff > month) {
    num = Math.floor(diff / month);
    label = num + ' month' + (num > 1 ? 's' : '');
  } else if (diff > week) {
    num = Math.floor(diff / week);
    label = num + ' week' + (num > 1 ? 's' : '');
  } else if (diff > day) {
    num = Math.floor(diff / day);
    label = num + ' day' + (num > 1 ? 's' : '');
  } else if (diff > hour) {
    num = Math.floor(diff / hour);
    label = num + ' hour' + (num > 1 ? 's' : '');
  } else if (diff > minute) {
    num = Math.floor(diff / minute);
    label = num + ' min' + (num > 1 ? 's' : '');
  } else {
    label = 'just now';
  }

  return label;
};