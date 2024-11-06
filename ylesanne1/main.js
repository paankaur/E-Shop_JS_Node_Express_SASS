// klassid

class Product {
  constructor(title, price, category) {
    this.title = title;
    this.price = price;
    this.category = category;
  }

  describe() {
    return `Title: ${this.title}, Price: €${this.price}, Category: ${this.category}`;
  }
  static discountedPrice(price, discount) {
    return price - (price * discount / 100);
  }
}
