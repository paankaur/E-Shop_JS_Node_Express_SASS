import { Product } from "./constructors/product.js";
const BASE_URL = "https://fakestoreapi.com"
export const getProductsDataFromJson = async () => {
    try {
        const data = await fetch("./data.json");
        return data.json();
    } catch (error) {
        console.error(error);
    }
};

export const getProductsByCategory = async (category) => {
    try {
        const data = await fetch(`${BASE_URL}/products/category/${category}`);
        const productsData = await data.json();

        const dataObject = productsData.map(
            (item) => 
                new Product(
                    item.id,
                    item.title,
                    item.price,
                    item.category,
                    item.description,
                    item.image
                )
        );
        return dataObject;

    } catch (error) {
        console.error(error);
    }
};

export const getAllCategory = async () => {
    try {
        const data = await fetch(`${BASE_URL}/products/categories`);
        return data.json();
    } catch (error) {
        console.error(error);
    }
};

export const getProductById = async (productId) => {
    try {
        const data = await fetch(`${BASE_URL}/products/${productId}`);
        const productData = await data.json();
        const dataObject = new Product(
            productData.id,
            productData.title,
            productData.price,
            productData.category,
            productData.description,
            productData.image

        );
        return dataObject;
    } catch (error) {
        console.error(error);
    }
};