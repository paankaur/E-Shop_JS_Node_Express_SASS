// klassid

class Product {
  constructor(title, price, category) {
    this.title = title;
    this.price = price;
    this.category = category;
  }

  describe() {
    return `Title: ${this.title}, Price: €${this.price.toFixed(2)}, Category: ${this.category}`;
  }
  static discountedPrice(price, discount) {
    let discounted = price - (price * discount / 100);
    return `€${discounted.toFixed(2)}`;
  }
}
const laptop = new Product("Läppar", 100, "Elektroonika");



console.log(Product.discountedPrice(laptop.price, 10));
console.log(laptop.describe(), Product.discountedPrice(laptop.price, 10));

class Cart {
  
}
// class extends?