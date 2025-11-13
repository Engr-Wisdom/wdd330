import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.forEach(item => cartItemTemplate(item))
  console.log(cartItems)
}

function cartItemTemplate(item) {
  const products = document.querySelector(".products")
  let ul = document.createElement("ul");
    ul.className = "product-list"
    ul.innerHTML = `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Image}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`

  return products.append(ul)
}

renderCartContents();































































// import { getLocalStorage } from "./utils.mjs";

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart") || [];
//   const container = document.querySelector(".product-list");

//   if (!container) {
//     console.error("Cart container '.product-list' not found in HTML!");
//     return;
//   }

//   if (!cartItems.length) {
//     container.innerHTML = "<p>Your cart is empty</p>";
//     return;
//   }

//   // Log items for debugging
//   console.log("Cart Items:", cartItems);

//   // Map items to HTML
//   const htmlItems = cartItems
//     .map(item => {
//       // Extra safety in case properties are missing
//       if (!item.Name || !item.Image || !item.FinalPrice || !item.Colors) {
//         console.warn("Cart item has missing properties:", item);
//         return "";
//       }
//       return cartItemTemplate(item);
//     })
//     .join("");

//   container.innerHTML = htmlItems;
// }

// function cartItemTemplate(item) {
//   // return `
//   //   <li class="cart-card divider">
//   //     <a href="#" class="cart-card__image">
//   //       <img src="${item.Image}" alt="${item.Name}" />
//   //     </a>
//   //     <a href="#">
//   //       <h2 class="card__name">${item.Name}</h2>
//   //     </a>
//   //     <p class="cart-card__color">${item.Colors[0]?.ColorName || "N/A"}</p>
//   //     <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
//   //     <p class="cart-card__price">$${item.FinalPrice}</p>
//   //   </li>
//   // `;

//   return `
//     <li class="cart-card divider">
//       ${item.Name} | ${item.FinalPrice} | ${item.Colors ? item.Colors[0].ColorName : "N/A"}
//     </li>
//   `;

// }

// window.addEventListener("DOMContentLoaded", () => {
//   const cartItems = getLocalStorage("so-cart");
//   console.log("Cart items from localStorage:", cartItems);
//   renderCartContents()
// });

