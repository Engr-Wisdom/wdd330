import { bindHeader, getLocalStorage, searchFunction, setLocalStorage } from "./utils.mjs";

const key = "8987da0569b33f4d5d7b4977bca61c9e"

bindHeader()

searchFunction(key)

function detailsTemplate(detail) {
    const detailsContainer = document.querySelector(".details-container")

    detailsContainer.innerHTML = `
        <div class="backdrop">
          <img src="https://image.tmdb.org/t/p/w200/${detail.backdrop_path}" alt="" />
        </div>

        <div class="details-content">
          <div class="poster">
            <img src="https://image.tmdb.org/t/p/w200/${detail.poster_path}" alt="${detail.title}" />
          </div>

          <div class="info">
            <h1>${detail.title}</h1>

            <div class="meta">
              <span id="releaseDate">${detail.release_date}</span>
              <span class="dot">•</span>
              <span id="rating">${detail.vote_average}/10</span>
              <span class="dot">•</span>
              <span id="runtime">${detail.runtime} mins</span>
            </div>

            <div class="genres"></div>

            <p class="overview">${detail.overview}</p>

            <button class="watchlist-btn">
              <i class="far fa-bookmark"></i> Add to Watchlist
            </button>
            <p class="add-txt"><i class="fa-solid fa-check"></i> Added to watchlist</p>
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

async function fetchdetail() {
    const param = new URLSearchParams(window.location.search)
    const movieId = param.get("id")
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Can't fetch movie details from this resource")
        }

        const detail = await response.json()
        
        detailsTemplate(detail)

        const watchlistBtn = document.querySelector(".watchlist-btn")
        watchlistBtn.addEventListener("click", () => {
          addToCart(detail)
          const addTxt = document.querySelector(".add-txt");
          addTxt.classList.add("show")
          setTimeout(() => {
            addTxt.classList.remove("show")
          }, 5000)
        })

    } catch(error) {
        console.error(error)
    }
}

fetchdetail()