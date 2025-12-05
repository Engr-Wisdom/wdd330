// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(para) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get("product")
}

export function formatDataToJSON(formData) {
  const obj = {};

  for (let [key, value] of formData.entries()) {
    obj[key] = value;
  }

  return obj;
}

export function renderListWithTemplate(templateFn, parentElement, list, position="afterbegin", clear=false) {
  if (clear) parentElement.innerHTML = "";

  const htmlStrings = list.map(templateFn)
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""))
}


export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../public/partials/header.html");
  const footerTemplate = await loadTemplate("../public/partials/footer.html")

  const headerElement = document.querySelector("header")
  const footerElement = document.querySelector("footer")

  renderWithTemplate(headerTemplate, headerElement)
  renderWithTemplate(footerTemplate, footerElement)
}

export function alertMessage(message, scroll = true) {
  const mainElement = document.querySelector("main");

  const existing = document.querySelector(".custom-alert");
  if (existing) existing.remove();

  const alertElement = document.createElement("div");
  alertElement.classList.add(".custom-alert")
  alertElement.textContent = message;

  mainElement.prepend(alertElement);

  if (scroll) {
    alertElement.scrollIntoView({behavior: "smooth"})
  }
  
}


// export function updateCartCount() {
//   const cartItems = getLocalStorage("so-cart");
//   const countElements = document.querySelector(".cart-count");
  
//   if (cartItems.length > 0) {
//     countElements.textContent = cartItems.length
//   } else {
//     countElements.textContent = 0;
//   }
// }

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const countElements = document.querySelectorAll('.cart-count');
  
  countElements.forEach(element => {
    if (cartItems.length > 0) {
      element.textContent = cartItems.length;
      element.style.display = 'inline'; // Make sure it's visible
    } else {
      element.textContent = '0';
      element.style.display = 'none'; // Hide when empty
    }
  });

  document.dispatchEvent(new CustomEvent('cartUpdated', {
    detail: { count: cartItems.length }
  }));
}