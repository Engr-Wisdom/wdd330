import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, formatDataToJSON, alertMessage } from "./utils.mjs"

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = []
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary()
    }

    calculateItemSummary() {
        this.itemTotal = this.list.reduce((sum, item) => {
            let price = Number(item.FinalPrice ?? item.ListPrice ?? 0)

            return sum + price
        }, 0)

        const subTotal = document.getElementById("subtotal");
        
        subTotal.textContent = this.itemTotal.toFixed(2)
    }

    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;
        this.shipping = this.list.length ? + (this.list.length - 1) * 2 : 0;
        this.orderTotal = this.itemTotal + this.tax + this.shipping

        this.displayOrderTotals()
    }

    displayOrderTotals() {
        const tax = document.querySelector(`${this.outputSelector} #tax`)
        const shipping = document.querySelector(`${this.outputSelector} #shipping`)
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`)

        tax.textContent = this.tax.toFixed(2);
        shipping.textContent = this.shipping.toFixed(2);
        orderTotal.textContent = this.orderTotal.toFixed(2);
    }

    packageItems(items) {   
        return items.map(item => ({
            id: item.Id,
            name: item.Name,
            price: Number(item.FinalPrice ?? item.ListPrice ?? 0),
            quantity: 1
        }));
    }

    async checkout(form) {
        const formData = new FormData(form);
        const order = formatDataToJSON(formData);

        // Fix capitalization and required keys
        order.orderDate = new Date().toISOString();
        order.items = this.packageItems(this.list);
        order.orderTotal = this.orderTotal.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.shipping = this.shipping;

        // Debug: check the object before sending
        console.log("Sending order:", order);

        const service = new ExternalServices();
        try {
            const response = await service.checkout(order);
            return response;
        } catch (error) {
            alertMessage("Checkout failed", error.message);
            throw error;
        }
    }

}