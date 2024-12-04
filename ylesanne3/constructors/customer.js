import { Order } from "./order.js";

export class Customer {
    constructor(name) {
      this.name = name;
      this.orderHistory = [];
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
  }