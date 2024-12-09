// import { Cart } from "../constructors/cart.js";
export const displayProductDetailView = (product) => {
  const container = document.getElementById("main-container");
  container.innerHTML = "";

  const productCard = document.createElement("div");
  productCard.classList.add("product");
  productCard.innerHTML = `
  <h2>${product.title}</h2>
  <p>Category: ${product.category}</p>
  <p>Price: €${product.price}</p>
  <p>ID: ${product.id}</p>

  `;

  container.append(productCard);


};
