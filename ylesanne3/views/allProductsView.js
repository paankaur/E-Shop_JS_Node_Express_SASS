import { navigate } from "../router.js";
import { cartConstructor } from "../constructors/cart.js";
import { customerConstructor } from "../constructors/customer.js";

export const displayAllProductsView = (products) => {
    const container = document.getElementById("products");
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
        <button id="addToCartBtn">Add to cart</button>
        <button id="addToFavoritesBtn">Toggle favorites</button>
        `;



         productCard.onclick = (e) => {
             e.stopPropagation();
             navigate("productDetail", product);
         };

        productsContainer.append(productCard);

        productCard.addEventListener("click", (event) => {
            if (event.target.id === "addToCartBtn") {
                cartConstructor.addProduct(product);
            } else if (event.target.id === "addToFavoritesBtn") {
                customerConstructor.toggleFavorites(product);
            } else {
                navigate("productDetail", product);
            }
        });
        

    });
    container.append(productsContainer);
};

