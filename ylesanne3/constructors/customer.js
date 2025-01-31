import { Order } from "./order.js";
import {
  addFavoriteProductById,
  deleteFavoriteProductById,
  getFavoritesProductBycustomerId,
} from "../api.js";

export class Customer {
  constructor() {
    this._customerName;
    this._customerId = 1;
    this.orderHistory = [];
    this.favorites = [];
    this.id = Math.floor(Math.random() * 100);
  }

  get customerId() {
    return this._customerId;
  }

  set customerId(id) {
    const CUSTOMER_ID = sessionStorage.getItem("customerId");
    if (CUSTOMER_ID) {
      this._customerId = CUSTOMER_ID;
    } else {
      this._customerId = id;
      sessionStorage.setItem("customerId", id);
    }
  }
  get customerName() {
    return this._customerName;
  }

  set customerName(name) {
    this._customerName = name;
  }

  getCustomerData() {
    return { name: this._customerName, id: this._customerId };
  }

  

  placeOrder(cart) {
    const order = new Order(cart);
    this.orderHistory.push(order);
    order.printOrder();
  }

  printOrderHistory() {
    if (this.orderHistory.length === 0) {
      console.log(`${this._customerName} has no order history.`);
      return;
    }
    console.log(`${this._customerName}'s order history: `);
    this.orderHistory.forEach((order, index) => {
      console.log(`Order ${index + 1}:`);
      console.log(` Order date: ${order.orderDate.toDateString()}`);
      console.log(`Total price: €${order.cart.calculateTotal().toFixed(2)}`);
    });
  }
  async toggleFavorites(product) {
    const existingItem = this.favorites.find((item) => item.id === product.id);
    
    if (existingItem) {
      await deleteFavoriteProductById(this._customerId, product.id);
    } else {
      await addFavoriteProductById(this._customerId, product.id);
    }
    this.getAllFavorites();
  }

  async getAllFavorites() {
    const data = await getFavoritesProductBycustomerId(this._customerId);
    this.favorites = data;
    console.log("favorite", this.favorites);
    return this.favorites;
  }
  
  isFavorite(productId) {
    //console.log("is favorie", productId);
    console.log("is favorie", productId, this.favorites);
    const existingItem = this.favorites.find((item) => item.id === productId);

    return !!existingItem;
  }

}

export const customerConstructor = new Customer();
