import { displayCartView } from "../views/cartView.js";
export class Cart {
  constructor() {
    this.items = [];
    // this.VAT = 0.22;
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
    this.displayTotalItems();
  }

  // removeProduct(productName) {
  //   this.items = this.items.filter(
  //     (item) => item.product.title !== productName
  //   );
  // }

  removeProduct(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.displayTotalItems();
  }

  calculateTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  // get totalItems() {
  //   return this.items.reduce((total, item) => total + item.quantity, 0);
  // }

  displayTotalItems() {
    const cartCount = document.getElementById("cart-count");

    cartCount.innerHTML = this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  clear() {
    this.items = [];
    this.displayTotalItems();
    displayCartView();
  }
}

export const cartConstructor = new Cart();