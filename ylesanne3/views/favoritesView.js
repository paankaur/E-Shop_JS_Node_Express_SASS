import { customerConstructor } from "../constructors/customer.js"; 

 export const displayFavoritesView = () => {
   const favorites = customerConstructor.getAllFavorites();

   const container = document.getElementById("main-container");
   container.innerHTML = "<h2>Favorites</h2>";
  
   favorites.forEach((item) => {
     const favoriteItemElement = document.createElement("div");
     favoriteItemElement.classList.add("favorite-item");
     favoriteItemElement.innerHTML = `
         <h3>${item.product.title}</h3>
         <p>Price: €${item.product.price}</p>`;
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
// };