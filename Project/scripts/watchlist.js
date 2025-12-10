import { bindHeader, setLocalStorage, getLocalStorage } from "./utils.mjs";

bindHeader()

function renderWatchlist() {
    const watchlistMovies = document.querySelector(".movie-list");
    watchlistMovies.innerHTML = ""

    let movies = getLocalStorage()
    movies.forEach((movie, index) => {
        const figure = document.createElement("figure");
        figure.innerHTML = `
            <div class="poster-img">
                <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt=${movie.title}>
                <div class="option-container">
                    <button type="button" class="option-btn"><i class="fa-solid fa-ellipsis-v"></i></button>
                    <div class="options">
                        <button type="button" class="remove-watchlist">
                            <span>Remove from Watchlist</span> <i class="far fa-bookmark"></i>
                        </button>
                        <button type="button">
                            <span>Mark as Watched</span> <i class="fa-solid fa-circle-check"></i>
                        </button>
                    </div>
                </div>
            </div>
            <figcaption>
                <p>${movie.title}</p>
            </figcaption>
        `;

        const optionBtn = figure.querySelector(".option-btn")
        const options = figure.querySelector(".options")
        const removeBtn = figure.querySelector(".remove-watchlist");

        optionBtn.addEventListener("click", () => {
            options.classList.toggle("show")
        })

        removeBtn.addEventListener("click", () => {
            movies.splice(index, 1);
            setLocalStorage(movies)            
            renderWatchlist()
        })

        document.addEventListener("click", e => {
            if(!optionBtn.contains(e.target)) {
                options.classList.remove("show")
            }
        })
        
        watchlistMovies.appendChild(figure)
    })
}

renderWatchlist()