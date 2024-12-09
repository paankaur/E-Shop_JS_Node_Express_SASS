import { cartConstructor } from "../constructors/cart.js";



//Ostukorvi vaate genereerimine
export const displayCartView = () => {
  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Cart:</h2>";

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
      <h3>${item.product.title}</h3>
      <p>Price: €${item.product.price}</p>
      <p>Quantity: ${item.quantity}</p>
    `;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      // cartConstructor.removeProduct(item.product.id);
  //    if (item.quantity > 1) {
 //      cartConstructor.addProduct(item.product, -1);
 //     } else {}
 cartConstructor.addProduct(item.product, -1);
      displayCartView();
      // calculateTotal();
    };

      cartItemElement.appendChild(removeBtn);
      container.append(cartItemElement);
    });
    const totalPrice = cartConstructor.calculateTotal();
    const totalElement = document.createElement("p");
    totalElement.classList.add("cart-total");
    totalElement.innerHTML = `<strong>Total price: €${totalPrice.toFixed(2)}</strong>`;
    container.append(totalElement);
  }
};
