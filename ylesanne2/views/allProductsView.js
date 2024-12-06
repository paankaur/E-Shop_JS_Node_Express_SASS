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
        `;

        productsContainer.append(productCard);
        

    });
    container.append(productsContainer);
};

// kasuta Estonian(US) keyboard