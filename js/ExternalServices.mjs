async function convertToJson(res) {
  const jsonResponse = await res.json()
  
  if (res.ok) {
    return jsonResponse;
  } else {
    throw {name: "serviceError", message: jsonResponse}
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `../public/json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async checkout(order) {
    const url = "https://wdd330-backend.onrender.com/checkout";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    };

    const response = await fetch(url, options);
    const values = await response.json()

    if (response.ok) {
      return values
    } else {
      throw {
        name: "serviceError",
        message: values
      }
    }
  }

}