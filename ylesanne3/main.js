import { Product } from "./constructors/product.js"; // kindlasti pane .js faililaiendus!!!! kui importid
import { cartConstructor } from "./constructors/cart.js";
import { displayAllProductsView } from "./views/allProductsView.js";
import { customerConstructor } from "./constructors/customer.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayFavoritesView } from "./views/favoritesView.js";
import { navigate } from "./router.js";
import { getAllCategory } from "./api.js";



const initApp = async () => {
 

  const categories = await getAllCategory();
  const categoryMenu = document.getElementById("categories");

  categories.forEach((category) => {
    const categoryElement = document.createElement("button");
    categoryElement.textContent = category;
    categoryElement.onclick = () => displayAllProductsView(category);
   
     categoryMenu.appendChild(categoryElement);
  });

  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => navigate("cart");

  const favoritesButton = document.getElementById("favorites-button");
  favoritesButton.onclick = () => navigate("favorites");

  const pealkiriBtn = document.getElementById("pealkiri");
  
  pealkiriBtn.onclick = () => {
    const randomNum = Math.floor(Math.random() * 4);
    displayAllProductsView(categories[randomNum]);

  };

 

  // funktsioonide kutsumised
  displayAllProductsView(categories[1]);
  // displayProductDetailView(products[1]);
  // displayCartView();
  // displayFavoritesView();

};

document.addEventListener("DOMContentLoaded", initApp);



const pealkiri = document.getElementById("pealkiri");

document.title = "Legit Online Shop";
pealkiri.textContent = "🥑Cart-E-Mart🍺";

pealkiri.style.backgroundColor = "chocolate";
pealkiri.style.color = "purple";
pealkiri.style.textAlign = "center";





// https://vs24riives.ita.voco.ee/Veebiarendus/E_pood_ylesanne_4/
