import { cartConstructor } from "../constructors/cart.js";
import { customerConstructor } from "../constructors/customer.js";
import { Order } from "../constructors/order.js";
//Ostukorvi vaate genereerimine
export const displayCartView = () => {
  const container = document.getElementById("main-container");
  const cart = cartConstructor.getAllProducts();
  container.innerHTML = "";

  const cartContainer = document.createElement("div");
  cartContainer.id = "cart";
  cartContainer.className = "cart-container";
  cartContainer.innerHTML = "<h2>Cart</h2>";

  const cartItemsContainer = document.createElement("div");
  cartItemsContainer.className = "cart-items-container";


 

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
      <img src="${item.product.image}">
    `;
    // -button
      const minusBtn = document.createElement("button");
      minusBtn.textContent = "-";
      minusBtn.onclick = () => {
        cartConstructor.addProduct(item.product, -1);
        displayCartView();
      };
      // input btn
      const quantityInput = document.createElement("input");
      quantityInput.id ="quantity-input";
      quantityInput.type = "number";
      quantityInput.value = item.quantity;
      let timer;
      quantityInput.oninput = (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const newQantity = parseInt(e.target.value, 10);
          if (!isNaN(newQantity)) {
            cartConstructor.addProduct(
              item.product,
              newQantity - item.quantity
            );
            displayCartView();
          }
        }, 500);
      };
      // + button
      const plusBtn = document.createElement("button");
      plusBtn.textContent = "+";
      plusBtn.onclick = () => {
        cartConstructor.addProduct(item.product, 1);
        displayCartView();
      };

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.onclick = () => {
        cartConstructor.addProduct(item.product, -10);
        displayCartView();
        // calculateTotal();
      };
      cartItemElement.appendChild(minusBtn);
      cartItemElement.appendChild(quantityInput);
      cartItemElement.appendChild(plusBtn);
      cartItemElement.appendChild(removeBtn);
      container.append(cartItemElement);
    });
    const totalPrice = cartConstructor.calculateTotal();
    const totalElement = document.createElement("p");
    const VAT = 0.22;
    totalElement.classList.add("cart-total");
    totalElement.innerHTML = `<p><strong>Total price: €${totalPrice.toFixed(
      2
    )}</strong><br>Tax(included): €${(totalPrice * VAT).toFixed(2)}</p>`;
    container.append(totalElement);
  }

  cartContainer.append(cartItemsContainer);

  const totalPrice = cartConstructor.calculateTotal(); 

  const cartSummaryContainer = document.createElement("div");
  cartSummaryContainer.className = "cart-summary";
  cartSummaryContainer.innerHTML = `
  <h2>Summary</h2>
  <div class="summary">
     <p><strong>Total price: €${totalPrice.toFixed(2)}</strong></p>
     <p>Tax(included): €${(totalPrice * 0.22).toFixed(2)}</p>
  </div>
  `;

  const submitButton = document.createElement("button");
  submitButton.textContent = "Buy!";
  submitButton.onclick = (e) => {
    e.stopPropagation();
    customerConstructor.placeOrder(cartConstructor);
  };

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel cart";
  cancelButton.onclick = () => {
    cartConstructor.clear();
// displayCartView();
  };
  cartSummaryContainer.append(submitButton, cancelButton);
  container.append(cartContainer, cartSummaryContainer);
};
