// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage() {
  return JSON.parse(localStorage.getItem("so-cart")) || [];
}
// save data to local storage
export function setLocalStorage(data) {
  localStorage.setItem("so-cart", JSON.stringify(data));
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

export function renderListWithTemplate(templateFn, parentElement, list, position="afterbegin", clear=false) {
  if (clear) parentElement.innerHTML = "";

  const htmlStrings = list.map(templateFn)
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""))
}