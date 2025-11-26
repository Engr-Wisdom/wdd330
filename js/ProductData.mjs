async function convertToJson(res) {
  const jsonResponse = await res.json()
  
  if (res.ok) {
    return jsonResponse;
  } else {
    throw {name: "serviceError", message: jsonResponse}
  }
}

export default class ProductData {
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
}
