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
  <button id="addToCartBtn${product.id}">Add to cart</button>
  <button id="addToFavoritesBtn${product.id}">Toggle favorites</button>
  `;

  productCard.addEventListener("click", (event) => {
    if (event.target.id === `addToCartBtn${product.id}`) {
        cartConstructor.addProduct(product);
        // displayCartView();
    } else if (event.target.id === `addToFavoritesBtn${product.id}`) {
        customerConstructor.toggleFavorites(product);
        // displayFavoritesView();
    } else {
        navigate("productDetail", product);
    }
});

  container.append(productCard);


};
