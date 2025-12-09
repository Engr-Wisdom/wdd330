import { bindHeader, getLocalStorage } from "./utils.mjs";

bindHeader()

function renderWatchlist() {
    let movies = getLocalStorage()
    movies.forEach(movie => {
        const watchlistMovies = document.querySelector(".movie-list");
        const figure = document.createElement("figure");
        figure.innerHTML = `
            <div>
                <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt=${movie.title}>
            </div>
            <figcaption>${movie.title}</figcaption>
        `

        watchlistMovies.appendChild(figure)
    })
}

renderWatchlist()