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
