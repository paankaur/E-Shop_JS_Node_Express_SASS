import { cartConstructor } from "./cart.js";

export class Order {
  constructor(cart) {
    this.orderDate = new Date();
    this.cart = cart;
  }

  printOrder() {
    const cartContainer = document.getElementById("cart");
    const orderContainer = document.createElement("div");
    orderContainer.classList.add("order-container");
    orderContainer.innerHTML = `<h2>Order date: ${this.orderDate.toDateString()}</h2>`;

    this.cart.items.forEach((item) => {
      const cartElement = document.createElement("p");
      cartElement.innerHTML = `Product: ${item.product.title}
      <br>Price: €${item.product.price}
      <br>Quantity: ${item.quantity}
    `;
      orderContainer.append(cartElement);
    });
    const sumElement = document.createElement("h4");
    sumElement.innerHTML = `Total: €${this.cart.calculateTotal().toFixed(2)}`;

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.onclick = () => {
      orderContainer.className = "order-container-close";
      cartConstructor.clear();
    };
    orderContainer.append(sumElement, closeButton);
    cartContainer.append(orderContainer);

  }
}

// export const orderConstructor = new Order();
