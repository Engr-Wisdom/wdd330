export function bindHeader() {
    document.querySelector(".logo-container").addEventListener("click", () => {
        window.location.href = "./index.html"
    })

    document.querySelector(".watchlist").addEventListener("click", () => {
        window.location.href = "./watchlist.html"
    })

    const theme = document.getElementById("theme");
    theme.addEventListener("change", (e) => {
        e.preventDefault()

        if (e.target.value === "Light") {
            document.body.style.backgroundColor = "#ffffff";
            document.body.style.color = "#2c2c2c";
            document.querySelectorAll("figure").forEach(figure => {
                figure.style.border = "1px solid gray"
            })
        } else {
            document.body.style.backgroundColor = "#2c2c2c";
            document.body.style.color = "#ffffff";
            document.querySelectorAll("figure").forEach(figure => {
                figure.style.border = "none"
            })
        }
    })
}

export function setLocalStorage(values) {
    return localStorage.setItem("watchlist", JSON.stringify(values))
}

export function getLocalStorage() {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
}

export function searchFunction(key) {
    const searchInput = document.getElementById("searchInput");
    const suggestion = document.querySelector(".suggestion");

    // document.addEventListener("click", (e) => {
    //     if (!searchInput.contains(e.target)) {
    //         suggestion.style.maxHeight = "0px"
    //     }
    // })

    
    searchInput.addEventListener("input", async (e) => {
        const query =  `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${e.target.value}`;

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
                window.location.href = `./detail.html?id=${value.id}`
            })

            suggestion.append(li)
        })
    })
}