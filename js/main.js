import ProductList from "./productList.mjs";
import ProductData from "./productData.mjs";

const listElement = document.querySelector(".product-list");
const dataSource = new ProductData("../json/tents.json");
const category = "tents";

const productList = new ProductList(category, dataSource, listElement)
productList.init();