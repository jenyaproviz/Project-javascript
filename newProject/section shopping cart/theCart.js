// Define Cart class
export class Cart {
  constructor() {
    this.items = [];
  }
  
  // Add item to cart
  addItem(name, price) {
    let item = this.items.find(item => item.name === name);
    if (item) {
      item.quantity++;
    } else {
      item = { name, price, quantity: 1 };
      this.items.push(item);
    }
    this.saveCart();
  }
  
  // Remove item from cart
  removeItem(name) {
    this.items = this.items.filter(item => item.name !== name);
    this.saveCart();
  }
  
  // Get cart count
  getCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
  
  // Get cart total
  getTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  // Load cart from local storage
  loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      this.items = cart.items;
    }
  }

  // Save cart to local storage
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this));
  }
}


