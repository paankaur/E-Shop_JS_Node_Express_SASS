import { Product } from "./constructors/product.js"; // kindlasti pane .js faililaiendus!!!! kui importid
import { Cart } from "./constructors/cart.js";
import { displayAllProductsView } from "./views/allProductsView.js";
import { Customer } from "./constructors/customer.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayFavoritesView } from "./views/favoritesView.js";
import { navigate } from "./router.js";

//tegin tooted

const products = [
  new Product(1, "Laptop", 699.75, "Electronics"),
  new Product(2, "3x3", 32.9, "Puzzle"),
  new Product(3, "Tablet", 299.0, "Electronics"),
];

displayAllProductsView(products);
const cart = new Cart();
//uus
const favorites = []; 

const initApp = async () => {
  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => navigate("cart");

  // funktsioonide kutsumised
  //displayAllProductsView(products);
  displayProductDetailView(products[0]);
  displayCartView(cart);
  displayFavoritesView(favorites);

};

//Toodete kuvamine
// function displayProducts(category = null) {
//   const productsContainer = document.getElementById("products");
//   productsContainer.innerHTML = "";

//   const filteredProducts = category
//     ? products.filter((p) => p.category === category)
//     : products;

//   filteredProducts.forEach((product) => {
//     const productElement = document.createElement("div");
//     productElement.classList.add("product-item");
//     productElement.innerHTML = `<div onclick="showProductDetail(${product.id})">
//         <h3>${product.title}</h3><p>Category: ${product.category}</p>
//         <p>Price: €${product.price}</p></div>
//         <button onclick="addToCart(${product.id})">Add to cart</button>
//         <button onclick="addToFavorites(${product.id})">
//         Add to favorites for safekeeping</button>`;
//         productsContainer.appendChild(productElement);
//   });

  /* products.forEach((product) => {
    const productCard = document.createElement("div")
    const productTitle = document.createElement("h3")
    productCard.innerHTML = `<h3>${product.title}</h3>`
    products.append(productTitle);
    products.append(productCard);
}) */
// }
// displayProducts("Pusle");
//Ostukorv ja lisan tooteid sinna

// cart.addProduct(laptop, 1);
// cart.addProduct(kuubik, 5);
// cart.addProduct(kuubik, -3);

//Ostukorvi sisuhaldus
console.log("Kogusumma: ", cart.calculateTotal());
console.log("Ostukorvi sisu: ", cart.totalItems);

// Teen kliendi ja tellimuse
const customer = new Customer("Kirsika");
customer.placeOrder(cart);

//Tellimuse ajaloo kuvamine
customer.printOrderHistory();

// console.log(kuubik.describe());
// console.log(laptop.describe());

const pealkiri = document.getElementById("pealkiri");

document.title = "Legit Online Shop";
pealkiri.textContent = "Cart-E-Mart";

pealkiri.style.backgroundColor = "chocolate";
pealkiri.style.color = "purple";
pealkiri.style.textAlign = "center";





// const mainDiv = document.getElementById("mainDiv");
console.log(products);
