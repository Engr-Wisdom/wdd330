import CheckoutProcess from "./CheckoutProcess.mjs"
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter()

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init()

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault()
    checkout.calculateOrderTotal()

    const form = e.target;

    if (!form.checkValidity()) {
        return form.reportValidity()
    }

    try {
        const response = await checkout.checkout(e.target)
        console.log(`Order Complete! Server response: ${response}`)

        localStorage.removeItem("so-cart");

        window.location.href = "../checkout/success.html"

    } catch(error) {
        alert(`Checkout failed ${error.message}`)
    }
})