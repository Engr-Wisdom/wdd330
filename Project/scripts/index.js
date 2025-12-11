import { bindHeader } from "./utils.mjs"

const key = "8987da0569b33f4d5d7b4977bca61c9e"

bindHeader()

async function fetchMovieData() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Can't fetch Data from this resource")
        }

        const values = await response.json();
        console.log(values)

        values.results.forEach(value => {
            const movieList = document.querySelector(".movie-list");
            const figure = document.createElement("figure")
            figure.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w200/${value.poster_path}" alt="${value.title}">
                <figcaption>${value.title}</figcaption>
            `;

            // if (value.title.length > 10) {
            //     value.title.slice(0, 10)

            //     console.log(value.title)
            // }

            figure.addEventListener("click", () => {
                window.location.href = `./details.html?id=${value.id}`
            })

            movieList.appendChild(figure)
        })

    } catch(error) {
        console.error(error)
    }
}

fetchMovieData()

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", async (e) => {
    const query =  `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${e.target.value}`;
    const suggestion = document.querySelector(".suggestion")

    const resp = await fetch(query);
    const values = await resp.json();
    console.log(values)

    values.results.forEach(value => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <img src=https://image.tmdb.org/t/p/w200/${value.poster_path} alt=${value.title}>
            </div
            <p>${value.title}</p>
        `;

        li.addEventListener("click", () => {
            window.location.href = `./details.html?id=${value.id}`
        })

        suggestion.append(li)
    })
})