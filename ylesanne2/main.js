import { Product } from "./product.js"; // kindlasti pane .js faililaiendus!!!! kui importid
import { Cart } from "./cart.js";
import { displayAllProductsView } from "./views/allProductsView.js";
import { Customer } from "./customer.js";

//tegin tooted

const products = [
  new Product(1, "Rüperaal", 699.75, "Elektroonika"),
  new Product(2, "3x3", 32.9, "Pusle"),
  new Product(3, "Tahvelarvuti", 299.0, "Elektroonika"),
];

displayAllProductsView(products);
const cart = new Cart();

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

document.title = "Kaunis E-Pood!";

pealkiri.style.backgroundColor = "chocolate";
pealkiri.style.color = "purple";
pealkiri.style.textAlign = "center";

console.log("mu title on: " + "pealkiri");

pealkiri.textContent = "Kaubik";

const mainDiv = document.getElementById("mainDiv");
console.log(products);
