import { getLocalStorage, loadHeaderSideBarFooter, setLocalStorage } from "./utils.mjs";

loadHeaderSideBarFooter()

function detailsTemplate(movieDetail) {
    const detailsContainer = document.querySelector(".details-container")

    detailsContainer.innerHTML = `
        <div class="backdrop">
          <img src="" alt="" />
        </div>

        <div class="details-content">
          <div class="poster">
            <img src="images/wisdom.jpg" alt="" />
          </div>

          <div class="info">
            <h1>Movie Title</h1>

            <div class="meta">
              <span id="releaseDate">2024</span>
              <span class="dot">•</span>
              <span id="rating">8.5/10</span>
              <span class="dot">•</span>
              <span id="runtime">144 mins</span>
            </div>

            <div class="genres"></div>

            <p class="overview">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed
              perspiciatis, voluptate, ipsam incidunt accusamus architecto
              quidem porro neque optio, qui cum! Corrupti tempore eaque aliquid
              dolorem, enim sint nam quaerat?
            </p>

            <button class="watchlist-btn">
              <i class="far fa-bookmark"></i> Add to Watchlist
            </button>
          </div>
        </div>
    `

    document.querySelector("watchlist-btn").addEventListener("click", () => {
        console.log("Clicked")
    })

    return detailsContainer
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
        console.log(movieDetail)
        
        detailsTemplate(movieDetail)


    } catch(error) {
        console.error(error)
    }
}

fetchMovieDetail()