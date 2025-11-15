import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(dataSource, productId) {
        this.dataSource = dataSource;
        this.productId = productId;
        this.product = {}
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId)

        this.renderProductDetails()

        document.getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this))
    }

    renderProductDetails() {
        const container = document.querySelector(".product-detail")
        container.innerHTML = `            
            <h2 class="divider">${this.product.Name}</h2>
            <img class="divider" src="${this.product.Image}" alt="${this.product.Name}">
            <p class="product-card__price">${this.product.FinalPrice}</p>
            <p class="product__color">${this.product.Colors[0].ColorName}</p>
            <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
            <div class="product-detail__add">
                <button id="addToCart" data-id="880RR">Add to Cart</button>
            </div>
        `
    }

    addProductToCart() {
        const cartItems = getLocalStorage();
        cartItems.unshift(this.product);
        setLocalStorage(cartItems)
        alert(`${this.product.Name} added to cart`)
    }
}