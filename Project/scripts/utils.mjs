export async function loadTemplate(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error("Can't fetch data from this resource")
        }
        const value = await response.text();

        return value

    } catch(error) {
        console.error(error)
    }
}

export async function loadHeaderSideBarFooter() {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const sideBar = document.querySelector(".side-bar")

    header.innerHTML = await loadTemplate("../public/header.html");
    sideBar.innerHTML = await loadTemplate("../public/sidebar.html")
    footer.innerHTML = await loadTemplate("../public/footer.html");

    const logoContainer = document.querySelector(".logo-container");
    logoContainer.addEventListener("click", () => {
        window.location.href = "./index.html"
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

export function getLocalStorage(key) {
    return localStorage.getItem(key) || [];
}