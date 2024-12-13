import { customerConstructor } from "../constructors/customer.js";
import { cartConstructor } from "../constructors/cart.js";

export const displayFavoritesView = () => {
  const favorites = customerConstructor.getAllFavorites();

  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Favorites:</h2>";
  if (favorites.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.innerText = "Your favorites list is empty.";
    container.appendChild(emptyMessage);
    return;
  }

  favorites.forEach((item) => {
    const favoriteItemElement = document.createElement("div");
    favoriteItemElement.classList.add("favorite-item");
    favoriteItemElement.innerHTML = `
         <h3>${item.product.title}</h3>
         <p>Price: €${item.product.price}</p>
         <img src="${item.product.image}"><br>
         <button id="addToCartBtn${item.product.id}">Add to cart</button>
         <button id="removeFavorites${item.product.id}">Remove from favorites</button>`;

    const cartButton = favoriteItemElement.querySelector(
      `#addToCartBtn${item.product.id}`
    );
    cartButton.addEventListener("click", (event) => {
      cartConstructor.addProduct(item.product);
    });


    const favoritesButton = favoriteItemElement.querySelector(
      `#removeFavorites${item.product.id}`
    );
    favoritesButton.addEventListener("click", (event) => {
   //   cartConstructor.addProduct(item.product);
         customerConstructor.toggleFavorites(item.product);
         favoriteItemElement.remove()
    });

    container.appendChild(favoriteItemElement);
  });
};

// export const displayFavoritesView = (favorites) => {
//   const container = document.getElementById("main-container");
//   container.innerHTML = "<h2>Favorites</h2>";
//   if (favorites == []) {
//     const favoritesItemElement = document.createElement("p");
//     favoritesItemElement.innerText = "Favorites is empty..";
//     container.append(favoritesItemElement);
//   } else {

//   favorites.forEach((item) => {
//     const favoriteItemElement = document.createElement("div");
//     favoriteItemElement.classList.add("favorite-item");
//     favoriteItemElement.innerHTML = `
//         <h3>${item.title}</h3>
//         <p>Price: €${item.price}</p>`;
//     container.appendChild(favoriteItemElement);
//   });
// }
// }
