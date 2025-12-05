import { loadHeaderFooter, updateCartCount } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

async function init() {
    await loadHeaderFooter();

    updateCartCount()

    const searchInput = document.getElementById("search");
    const suggestion = document.getElementById("suggestion");

    const listElement = document.querySelector(".product-list");
    const dataSource = new ExternalServices("tents");
    const productList = new ProductList("tents", dataSource, listElement);
    productList.init();

    const products = await dataSource.getData();

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();

        if (!query) {
            suggestion.style.display = "none";
            suggestion.innerHTML = "";
            return;
        }

        const filtered = products.filter(product => {
            const nameMatch = product.Name.toLowerCase().includes(query);
            const brandMatch = product.Brand.Name.toLowerCase().includes(query);
            return nameMatch || brandMatch;
        });

        suggestion.innerHTML = "";

        filtered.slice(0, 6).forEach(product => {
            const li = document.createElement("li");
            li.textContent = product.Name;

            li.addEventListener("click", () => {
                window.location.href = `/product_pages/index.html?product=${product.Id}`;
            });

            suggestion.appendChild(li);
        });

        suggestion.style.display = filtered.length > 0 ? "block" : "none";
    });

    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target)) {
            suggestion.style.display = "none";
        }
    })
}

init()