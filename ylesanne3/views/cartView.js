import { Cart } from "../constructors/cart.js";

export const cartConstructor = new Cart();

//Ostukorvi vaate genereerimine
export const displayCartView = () => {
  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Cart</h2>";

  const cart = cartConstructor.getAllProducts();

  if (!cart.length) {
    const cartItemElement = document.createElement("p");
    cartItemElement.innerText = "Cart is empty..";
    container.append(cartItemElement);
  } else {
    cart.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
      <h3>${item.title}</h3>
      <p>Price: €${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
    `;
      container.append(cartItemElement);
    });
  }
};
