export class Product {
  constructor(id, title, price, category) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
  }

  describe() {
    return `Title: ${this.title}, Category: ${
      this.category
    }, Price: €${this.price.toFixed(2)}`;
  }
  static discountedPrice(price, discount) {
    let discounted = price - (price * discount) / 100;
    return `€${discounted.toFixed(2)}`; //Allahindlus
  }
}