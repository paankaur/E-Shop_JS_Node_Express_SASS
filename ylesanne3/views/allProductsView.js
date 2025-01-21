import { navigate } from "../router.js";
import { cartConstructor } from "../constructors/cart.js";
import { customerConstructor } from "../constructors/customer.js";
import { displayCartView } from "./cartView.js";
import { displayFavoritesView } from "./favoritesView.js";
import { getProductsDataByCategory } from "../api.js";

export const displayAllProductsView = async (category) => {
  const products = await getProductsDataByCategory(category);

  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Products</h2>";

  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products-container");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: €${product.price}</p>
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

    favoritesButton.addEventListener("click", (e) => {
      customerConstructor.toggleFavorites(product);
      favoritesButton.innerHTML = customerConstructor.isFavorite(product)
        ? "Added to favorites"
        : "Add to favorites";
        e.stopPropagation();
    });

    productCard.addEventListener("click", (event) => {
      if (event.target.id === `addToCartBtn${product.id}`) {
        cartConstructor.addProduct(product);
        // displayCartView();
      } /* else if (event.target.id === `addToFavoritesBtn${product.id}`) {
                customerConstructor.toggleFavorites(product);
                // displayFavoritesView();
            } */ else {
        navigate("productDetail", product);
      }
    });

    productsContainer.append(productCard);
  });
  container.append(productsContainer);
};
