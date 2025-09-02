async function loadMovies() {
  const res = await fetch("movies.json");
  const movies = await res.json();
  let filtered = movies;

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase();
      filtered = movies.filter(m => m.title.toLowerCase().includes(q));
      renderMovies(filtered);
    });
  }

  renderAlphabet(movies);
  renderMovies(movies);
}

function renderAlphabet(movies) {
  const alphabetDiv = document.getElementById("alphabet");
  if (!alphabetDiv) return;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  alphabetDiv.innerHTML = letters.map(l => 
    `<button class="btn btn-sm btn-outline-light m-1" onclick="filterByLetter('${l}')">${l}</button>`
  ).join("");
}

function filterByLetter(letter) {
  fetch("movies.json")
    .then(res => res.json())
    .then(movies => {
      const filtered = movies.filter(m => m.title.toUpperCase().startsWith(letter));
      renderMovies(filtered);
    });
}

function renderMovies(movies) {
  const container = document.getElementById("movies");
  if (!container) return;
  container.innerHTML = movies.map(m => `
    <div class="col-6 col-md-3">
      <div class="card bg-dark text-white movie-card h-100">
        <img src="${m.poster}" class="card-img-top" alt="${m.title}">
        <div class="card-body">
          <h6 class="card-title">${m.title}</h6>
          <p class="small">(${m.year})</p>
          <a href="movie.html?id=${m.id}" class="btn btn-danger btn-sm">View</a>
        </div>
      </div>
    </div>
  `).join("");
}

loadMovies();
