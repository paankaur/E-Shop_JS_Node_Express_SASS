import { Product } from "./product.js"; // kindlasti pane .js faililaiendus!!!! kui importid
import { Cart } from "./cart.js";
// import { Order } from "./order";  //Customeris juba on see importitud
import { Customer } from "./customer.js";

//tegin tooted

const products = [
    new Product(1, "Rüperaal", 699.75, "Elektroonika"),
    new Product(2, "3x3", 32.90, "Pusle"),
    new Product(3, "Tahvelarvuti", 299.00, "Elektroonika"),

];
//Toodete kuvamine
 function displayProducts() {
    const mainDiv = document.getElementById("mainDiv");
 }
products.forEach((product) => {
    const productCard = document.createElement("div")
    const productTitle.textContent = document.createElement("h3")
    productCard.innerHTML = `<h3>${product.title}</h3>`
    mainDiv.append(productTitle);
    // mainDiv.append(productCard);
});
displayProducts();
//Ostukorv ja lisan tooteid sinna
const cart = new Cart();
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

document.title = "Kaunis E-Pood!"

pealkiri.style.backgroundColor = "chocolate";
pealkiri.style.color = "purple";
pealkiri.style.textAlign = "center";


console.log("mu title on: " + "pealkiri");

pealkiri.textContent = "Kaubik"

const mainDiv = document.getElementById("mainDiv");
console.log("mainDiv");