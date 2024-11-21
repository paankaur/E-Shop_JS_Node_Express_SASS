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
    return `€${discounted.toFixed(2)}`;//Allahindlus
  }
}
/* const laptop = new Product("Läppar", 100, "Elektroonika");

console.log(Product.discountedPrice(laptop.price, 10));
console.log(laptop.describe(), Product.discountedPrice(laptop.price, 10)); */

// class extends?

class Cart {
  constructor() {
    this.items = [];
  }

  addProduct(product, quantity) {
    const existingItem = this.items.find(item => item.product.title === product.title);
    if (existingItem) {
      existingItem.quantity += quantity;
      if (existingItem.quantity <= 0) {
        this.items = this.items.filter(item => item.product.title !== product.title);
      }
    } else if (quantity > 0) {
      this.items.push({ product, quantity });
    }
  }

  removeProduct(productName) {
    this.items = this.items.filter(item => item.product.title !== productName);
  }

  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  get totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
}

/* const laptop = new Product("Läppar", 1000, "Elektroonika");

const cart = new Cart();

cart.addProduct(laptop, 5);
console.log(cart.totalItems);
console.log(cart.calculateTotal());

cart.addProduct(laptop, -2);
console.log(cart.totalItems);
console.log(cart.calculateTotal());


console.log(cart.totalItems);
console.log(cart.calculateTotal());
console.log(cart); */