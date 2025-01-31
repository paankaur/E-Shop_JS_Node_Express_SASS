import { Product } from "./constructors/product.js";

// const BASE_URL = 'localhost:3000';
export const getProductsDataFromJson = async () => {
  try {
    const data = await fetch("/api/products");
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProductsDataByCategory = async (category) => {
  try {
    const byCategory = category ? `/category/${category}` : "";
    const data = await fetch(`/api/products${byCategory}`);
    // const data = await application.get(`${BASE_URL}/data/products.json/${category}`);
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
    const data = await fetch("api/products/categories");
    return data.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (productId) => {
  try {
    const data = await fetch(`api/products/${productId}`);
    const productData = await data.json();
    console.log(productData);

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

export const deleteFavoriteProductById = async (customerId, productId) => {
  try {
    const data = await fetch(`api/favorites/${customerId}/${productId}`, {
      method: "DELETE",
    });

    const productData = await data.json();
    return productData;
  } catch (error) {
    console.error(error);
  }
};

export const getFavoritesProductBycustomerId = async (customerId) => {
  try {
    const data = await fetch(`api/favorites/${customerId}`);

    const productsData = await data.json();

    console.log(productsData);
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

export const addFavoriteProductById = async (customerId, productId) => {
  try {
    const data = await fetch(`api/favorites/${customerId}/${productId}`, {
      method: "POST",
    });

    const productData = await data.json();
    return productData;
  } catch (error) {
    console.error(error);
  }
};