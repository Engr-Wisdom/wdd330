import { loadHeaderFooter, setLocalStorage, getLocalStorage } from "./utils.mjs"

loadHeaderFooter()

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {}
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    document.querySelector("main").innerHTML = this.renderProductDetails()

    document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this))
  }

  addProductToCart() {
    const cartItems = getLocalStorage();
    cartItems.unshift(this.product)
    setLocalStorage(cartItems)

    const addTxt = document.getElementById("addTxt");
    addTxt.classList.add("show")
    
    setTimeout(() => {
      addTxt.classList.remove("show")
    }, 3000)
  }

  renderProductDetails() {
    return `<section class="product-detail">
      <h2>${this.product.Brand.Name}</h2>
      <h3 class="divider">${this.product.NameWithoutBrand}</h3>
      <img src="${this.product.Image}"alt="${this.product.Name}" id="productImage" class="divider">
      <p id="productPrice" class="product-card__price">${this.product.FinalPrice}</p>
      <p id="productColor" class="product__color">${this.product.Colors[0].ColorName}</p>
      <p id="productDesc" class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="productId">Add to Cart</button>
        <p id="addTxt">Added To Cart</p>
      </div>
    </section>`
  }
}