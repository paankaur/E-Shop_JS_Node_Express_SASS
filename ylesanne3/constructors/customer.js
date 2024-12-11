import { Order } from "./order.js";

export class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
    this.favorites = [];
  }
  placeOrder(cart) {
    const order = new Order(cart);
    this.orderHistory.push(order);
  }
  printOrderHistory() {
    if (this.orderHistory.length === 0) {
      console.log(`${this.name} has no order history.`);
      return;
    }
    console.log(`${this.name}'s order history: `);
    this.orderHistory.forEach((order, index) => {
      console.log(`Order ${index + 1}:`);
      console.log(` Order date: ${order.orderDate.toDateString()}`);
      console.log(`Total price: €${order.cart.calculateTotal().toFixed(2)}`);
    });
  }
  toggleFavorites(product) {
    const existingItem = this.favorites.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      this.favorites = this.favorites.filter(
        (item) => item.product.id !== product.id
      );
    } else {
      this.favorites.push({ product });
    }
    console.log("Favorites: ", this.favorites);
  }
  getAllFavorites() {
    return this.favorites;
  }
  isFavorite(product) {
    return this.favorites.some((item) => item.product.id === product.id);
  }
}

export const customerConstructor = new Customer("Bob");
