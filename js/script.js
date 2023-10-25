const global = {
  currentPage: window.location.pathname,
  api: {
    key: "88673c9f7dc3eade1e5a3c26f5732b28",
    url: "https://api.themoviedb.org/3/",
  },
  search: {
    term: "",
    type: "",
    page: 1,
    toatalPages: 1,
    totalResult: 0,
  },
};

//DISPLAY TOP 20 POPULAR  MOVIES

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
                        ${
                          movie.poster_path
                            ? `<img
                              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                              alt="${movie.title}"
                              class="card-img-top"
                            />`
                            : `<img
                              src="images/no-image.jpg"
                              alt="${movie.title}"
                              class="card-img-top"
                            />`
                        }
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">
                        <small class="text-muted"> Release: ${
                          movie.release_date
                        } </small>
                        </p>
                    </div>`;

    document.getElementById("popular-movies").appendChild(div);
  });
}

//DISPLAY TOP 20 POULAR TV SHOWS

async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");

  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `<a href="tv-details.html?id=${show.id}">
                          ${
                            show.poster_path
                              ? `<img
                                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                                alt="${show.name}"
                                class="card-img-top"
                              />`
                              : `<img
                                src="images/no-image.jpg"
                                alt="${show.name}"
                                class="card-img-top"
                              />`
                          }
                      </a>
                      <div class="card-body">
                          <h5 class="card-title">${show.name}</h5>
                          <p class="card-text">
                          <small class="text-muted"> Release: ${
                            show.first_air_date
                          } </small>
                          </p>
                      </div>`;

    document.getElementById("popular-shows").appendChild(div);
  });
}

//DISPLAYING SPECIFIC Show DETAILS
async function displaShowDetails() {
  const showID = window.location.search.split("=")[1];

  const show = await fetchAPIData(`tv/${showID}`);

  displayBackgroundImage("show", show.backdrop_path);

  console.log(show);
  const div = document.createElement("div");
  div.id = "show-details";

  div.innerHTML = `<div class="details-top">
                    <div>
                        ${
                          show.poster_path
                            ? `<img
                          show.poster_path
                            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                            alt="${show.name}"
                            class="card-img-top"
                            />`
                            : `<img
                            src="images/no-image.jpg"
                            alt="${show.name}"
                            class="card-img-top"
                            />`
                        }
                        
                    </div>
                    <div>
                        <h2>${show.name}</h2>
                        <p><i class="fas fa-star text-primary"></i> 8 / 10</p>
                        <p class="text-muted">First Air Date: ${
                          show.first_air_date
                        }</p>
                        <p>${show.overview ? show.overview : show.name}</p>
                        <h5>Genres</h5>
                        <ul class="list-group">
                            ${show.genres
                              .map((genre) => `<li>${genre.name}</li>`)
                              .join("  ")}
                        </ul>
                        <a href="${
                          show.homepage
                        }" target="_blank" class="btn">Visit Show Homepage</a>
                    </div>
                    </div>
                    <div class="details-bottom">
                    <h2>TV-Show Info</h2>
                    <ul>
                        <li><span class="text-secondary">Total Seasons : </span>${
                          show.number_of_seasons
                        }</li>
                        <li><span class="text-secondary">Number Of Episodes : </span>${
                          show.number_of_episodes
                        }</li>
                        <li>
                        <span class="text-secondary">Last Episode To Air:</span>${
                          show.last_episode_to_air.name
                        }</li>
                        <li><span class="text-secondary">Status:</span>${
                          show.status
                        }</li>
                    </ul>
                    <h4>Production Companies</h4>
                    <div class="list-group">${show.production_companies
                      .map((company) => `${company.name}`)
                      .join("  ")}</div>
                    </div>`;

  document.getElementById("show-details").appendChild(div);
}

//DISPLAYS SPECIFIC MOvie DETAILS
async function displayMovieDetails() {
  const movieID = window.location.search.split("=")[1];
  console.log(movieID);

  const movie = await fetchAPIData(`movie/${movieID}`);

  displayBackgroundImage("movie", movie.backdrop_path);

  console.log(movie);
  const div = document.createElement("div");
  div.id = "movie-details";

  div.innerHTML = `<div class="details-top">
    <div>
    ${
      movie.poster_path
        ? `<img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          alt="${movie.title}"
          class="card-img-top"
        />`
        : `<img
          src="images/no-image.jpg"
          alt="${movie.title}"
          class="card-img-top"
        />`
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p><i class="fas fa-star text-primary"></i> ${movie.vote_average.toFixed(
        1
      )} / 10</p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
          ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join(" ")}
      </ul>
      <a href="${
        movie.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $ ${numberWithCommas(
        movie.budget
      )}</li>
      <li><span class="text-secondary">Revenue:</span> $ ${numberWithCommas(
        movie.revenue
      )}</li>
      <li><span class="text-secondary">Runtime:</span> ${
        movie.runtime
      } minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(" ")}</div>
  </div>`;

  document.getElementById("movie-details").appendChild(div);
}

//DISPLAY BACKDROP INTO THE DETAILS PAGES
function displayBackgroundImage(type, path) {
  const overlaydiv = document.createElement("div");

  overlaydiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
  overlaydiv.style.backgroundSize = "cover";
  overlaydiv.style.backgroundRepeat = "no-repeat";
  overlaydiv.style.height = "100vh";
  overlaydiv.style.width = "100vw";
  overlaydiv.style.position = "absolute";
  overlaydiv.style.top = "0";
  overlaydiv.style.left = "0";
  overlaydiv.style.zIndex = "-1";
  overlaydiv.style.opacity = "0.25";

  document.getElementById(`${type}-details`).appendChild(overlaydiv);
}

//SEARCH PAGE MOVIES TV SHOW
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.term = urlParams.get("search-term");
  global.search.type = urlParams.get("type");

  if (global.search.term !== "" && global.search.term !== "null") {
    //make request and display details
    const { results, page, total_pages, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.toatalPages = total_pages;
    global.search.totalResult = total_results;

    if (results.length === 0) {
      showAlert("NO Results found", "success");
    }

    displaySearchResults(results);

    document.querySelector("#search-term").value = "";
  } else {
    showAlert("please enter a search term", "error");
  }
}

function displaySearchResults(results) {
  document.getElementById("search-results").innerHTML = ``;
  document.getElementById("search-results-heading").innerHTML = ``;
  document.getElementById("pagination").innerHTML = ``;

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `<a href="${global.search.type}-details.html?id=${
      result.id
    }">
                          ${
                            result.poster_path
                              ? `<img
                                src="https://image.tmdb.org/t/p/w500${
                                  result.poster_path
                                }"
                                alt="${
                                  global.search.type === "movie"
                                    ? result.title
                                    : result.name
                                }"
                                class="card-img-top"
                              />`
                              : `<img
                                src="images/no-image.jpg"
                                alt="${
                                  global.search.type === "movie"
                                    ? result.title
                                    : result.name
                                }"
                                class="card-img-top"
                              />`
                          }
                      </a>
                      <div class="card-body">
                          <h5 class="card-title">${
                            global.search.type === "movie"
                              ? result.title
                              : result.name
                          }</h5>
                          <p class="card-text">
                          <small class="text-muted"> Release: ${
                            global.search.type === "movie"
                              ? result.release_date
                              : result.first_air_date
                          } </small>
                          </p>
                      </div>`;

    document.getElementById("search-results").appendChild(div);

    document.getElementById("search-results-heading").innerHTML = `
    <h2>${results.length} of ${global.search.totalResult} Results for ${global.search.term}</h2> 
    `;
  });
  displayPagination();
}

//CREATE AN D DISPLAY PAGINATION
function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");

  div.innerHTML = ` <button id="prev" class="btn btn-primary" >Prev</button>
    <button id="next" class="btn btn-primary">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.toatalPages}</div>`;

  document.querySelector("#pagination").appendChild(div);

  //DISABLE PREv button on page 1
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }

  if (global.search.page === global.search.toatalPages) {
    document.querySelector("#next").disabled = true;
  }

  //NExt PAge
  document.querySelector("#next").addEventListener("click", async () => {
    global.search.page++;

    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
    global.search.toatalPages = total_pages;
  });

  //Prev Pages
  document.querySelector("#prev").addEventListener("click", async () => {
    global.search.page--;

    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
    global.search.toatalPages = total_pages;
  });
}

//SEARCH API DATA
async function searchAPIData() {
  const API_KEY = global.api.key;
  const API_URL = global.api.url;

  showSpinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en=US&query=${global.search.term}&page=${global.search.page}`
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

//SHOW ALERT
function showAlert(message, className) {
  const alertEL = document.createElement("div");
  alertEL.classList.add("alert", className);
  alertEL.appendChild(document.createTextNode(message));
  document.getElementById("alert").appendChild(alertEL);

  setTimeout(() => alertEL.remove(), 3000);
}

//DISPLAY SLIDER
async function dipslaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  const wrapper = document.getElementById("swiper-wrapper");

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `<a href="./movie-details.html?id=${result.id}">
    <img src="https://image.tmdb.org/t/p/original/${result.poster_path}" alt="${
      result.title
    }" />
  </a>
  <h4 class="swiper-rating">
    <i class="fas fa-star text-secondary"></i> ${result.vote_average.toFixed(
      1
    )} / 10
  </h4>`;

    wrapper.appendChild(div);

    initSwiper();
  });

  // console.log(results);
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 1,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

//Fetch data from TMDB API

async function fetchAPIData(endpoint) {
  const API_KEY = global.api.key;
  const API_URL = global.api.url;

  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en=US`
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

//SPINNER
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

//HighLight Active Link
function highlight_active_link() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

//ADD COMMAS TO NUMBERS
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

//Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      console.log("HOME");
      dipslaySlider();
      break;
    case "/shows.html":
      console.log("SHOWS");
      break;
    case "/movie-details.html":
      console.log("MOVIE DETAILS");
      displayMovieDetails();
      break;
    case "/tv-details.html":
      console.log("TV Details");
      displaShowDetails();
      break;
    case "/search.html":
      search();
      break;
  }

  highlight_active_link();
  displayPopularMovies();
  displayPopularShows();
}

init();
