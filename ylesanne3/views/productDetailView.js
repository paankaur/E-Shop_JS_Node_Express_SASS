import { cartConstructor } from "../constructors/cart.js";
import { customerConstructor } from "../constructors/customer.js";

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
  <img src="${product.image}"><br>
  <button id="addToCartBtn${product.id}">Add to cart</button>
  <button id="addToFavoritesBtn${product.id}">${
    customerConstructor.isFavorite(product)
      ? "Added to favorites"
      : "Add to favorites"
  }</button>
  `;
  const favoritesButton = productCard.querySelector(
    `#addToFavoritesBtn${product.id}`
  );
  const cartButton = productCard.querySelector(`#addToCartBtn${product.id}`);

  favoritesButton.addEventListener("click", (e) => {
    customerConstructor.toggleFavorites(product);
    favoritesButton.innerHTML = customerConstructor.isFavorite(product)
      ? "Added to favorites"
      : "Add to favorites";
    // e.stopPropagation();
  });

  cartButton.addEventListener("click", (event) => {
    cartConstructor.addProduct(product);
  });

  //   productCard.addEventListener("click", (event) => {
  //     if (event.target.id === `addToCartBtn${product.id}`) {
  //         cartConstructor.addProduct(product);
  //         // displayCartView();
  //     } else if (event.target.id === `addToFavoritesBtn${product.id}`) {
  //         customerConstructor.toggleFavorites(product);
  //         // displayFavoritesView();
  //     } else {
  //         navigate("productDetail", product);
  //     }
  // });

  container.append(productCard);
};
