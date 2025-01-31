import { customerConstructor } from "../constructors/customer.js";
import { cartConstructor } from "../constructors/cart.js";

export const displayFavoritesView = async () => {
  const favorites = await customerConstructor.getAllFavorites();

  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Favorites:</h2>";
  console.log(favorites)
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
         <h3>${item.title}</h3>
         <p>Price: €${item.price}</p>
         <img src="${item.image}"><br>
         <button id="addToCartBtn${item.id}">Add to cart</button>
         <button id="removeFavorites${item.id}">Remove from favorites</button>`;

    const cartButton = favoriteItemElement.querySelector(
      `#addToCartBtn${item.id}`
    );
    cartButton.addEventListener("click", (event) => {
      cartConstructor.addProduct(item);
    });


    const favoritesButton = favoriteItemElement.querySelector(
      `#removeFavorites${item.id}`
    );
    favoritesButton.addEventListener("click", (event) => {
   
         customerConstructor.toggleFavorites(item);
         favoriteItemElement.remove()
    });

    container.appendChild(favoriteItemElement);
  });
};
