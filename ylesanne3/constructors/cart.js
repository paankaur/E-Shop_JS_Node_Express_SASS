export class Cart {
  constructor() {
    this.items = [];
  }

  getAllProducts() {
    return this.items;
  }

  addProduct(product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.product.title === product.title
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      if (existingItem.quantity <= 0) {
        this.items = this.items.filter(
          (item) => item.product.title !== product.title
        );
      }
    } else if (quantity > 0) {
      this.items.push({ product, quantity });
    }
  }

  // removeProduct(productName) {
  //   this.items = this.items.filter(
  //     (item) => item.product.title !== productName
  //   );
  // }

  removeProduct(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  calculateTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  get totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
  clear() {
    this.items = [];
  }
}

export const cartConstructor = new Cart();