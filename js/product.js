import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs"

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(dataSource, productId)
product.init()

// let cartItems = getLocalStorage()

// function addProductToCart(product) {
//   cartItems.unshift(product)
//   setLocalStorage(cartItems)
// }

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
//   console.log(product)
// }

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
