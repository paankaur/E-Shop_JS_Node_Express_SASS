import { Product } from "./product.js"; // kindlasti pane .js faililaiendus!!!! kui importid
import { Cart } from "./cart.js";
// import { Order } from "./order";  //Customeris juba on see importitud
import { Customer } from "./customer.js";

//tegin tooted
const laptop = new Product(1, "rüperaal", 699.75, "Elektroonika");
const kuubik = new Product(2, "3x3", 32.90, "Pusle");

//Ostukorv ja lisan tooteid sinna
const cart = new Cart();
cart.addProduct(laptop, 1);
cart.addProduct(kuubik, 5);
cart.addProduct(kuubik, -3);

//Ostukorvi sisuhaldus
console.log("Kogusumma: ", cart.calculateTotal());
console.log("Ostukorvi sisu: ", cart.totalItems);


// Teen kliendi ja tellimuse
const customer = new Customer("Kirsika");
customer.placeOrder(cart);

//Tellimuse ajaloo kuvamine
customer.printOrderHistory();

console.log(kuubik.describe());
console.log(laptop.describe());