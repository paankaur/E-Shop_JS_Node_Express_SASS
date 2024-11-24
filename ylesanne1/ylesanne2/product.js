export class Product {
    constructor(id, title, price, category) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.category = category;
    }
  
    describe() {
      return `Title: ${this.title}, Price: €${this.price.toFixed(2)}, Category: ${
        this.category
      }`;
    }
    static discountedPrice(price, discount) {
      let discounted = price - (price * discount) / 100;
      return `€${discounted.toFixed(2)}`; //Allahindlus
    }
  }