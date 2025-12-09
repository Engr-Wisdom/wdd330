import { bindHeader, getLocalStorage, setLocalStorage } from "./utils.mjs";

bindHeader()

function detailsTemplate(movieDetail) {
    const detailsContainer = document.querySelector(".details-container")

    detailsContainer.innerHTML = `
        <div class="backdrop">
          <img src="https://image.tmdb.org/t/p/w200/${movieDetail.backdrop_path}" alt="" />
        </div>

        <div class="details-content">
          <div class="poster">
            <img src="https://image.tmdb.org/t/p/w200/${movieDetail.poster_path}" alt="${movieDetail.title}" />
          </div>

          <div class="info">
            <h1>${movieDetail.title}</h1>

            <div class="meta">
              <span id="releaseDate">${movieDetail.release_date}</span>
              <span class="dot">•</span>
              <span id="rating">${movieDetail.vote_average}/10</span>
              <span class="dot">•</span>
              <span id="runtime">${movieDetail.runtime} mins</span>
            </div>

            <div class="genres"></div>

            <p class="overview">${movieDetail.overview}</p>

            <button class="watchlist-btn">
              <i class="far fa-bookmark"></i> Add to Watchlist
            </button>
          </div>
        </div>
    `;

    return detailsContainer
}

function addToCart(movie) {
  let carts = getLocalStorage()
  carts.unshift(movie)
  setLocalStorage(carts)
}

async function fetchMovieDetail() {
    const key = "8987da0569b33f4d5d7b4977bca61c9e"
    const param = new URLSearchParams(window.location.search)
    const movieId = param.get("id")
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Can't fetch movie details from this resource")
        }

        const movieDetail = await response.json()
        
        detailsTemplate(movieDetail)

        const watchlistBtn = document.querySelector(".watchlist-btn")
        watchlistBtn.addEventListener("click", () => {
          addToCart(movieDetail)
        })

    } catch(error) {
        console.error(error)
    }
}

fetchMovieDetail()