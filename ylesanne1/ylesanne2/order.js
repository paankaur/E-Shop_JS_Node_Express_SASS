import { Cart } from "./cart";

export class Order {
  constructor(cart) {
    this.orderDate = new Date();
    this.cart = cart;
  }

  printOrder() {
    console.log("Order date: ", this.orderDate);
    console.log("Shopping Cart: ");

    this.cart.items.forEach((item) => {
      console.log(
        `Product: ${item.product.title}, Quantity: ${item.quantity}, Price €${item.product.price}`
      );
    });
    console.log("Total price: €" + this.cart.calculateTotal().toFixed(2));
  }
}
