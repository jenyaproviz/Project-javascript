import { Product } from "./theProduct.js";
import { Cart } from "./theCart.js";

// Create Cart instance
let cart = new Cart();

// Load cart from local storage
cart.loadCart();

// Add event listeners
document.querySelectorAll('.btnAdd').forEach(button => {
  button.addEventListener('click', event => {
    let name = button.getAttribute('data-name');
    let price = button.getAttribute('data-price');
    cart.addItem(name, price);
    updateCart();
  });
});

document.querySelectorAll('.btnRemove').forEach(button => {
  button.addEventListener('click', event => {
    let name = button.getAttribute('data-name');
    cart.removeItem(name);
    updateCart();
  });
});


document.querySelector('#clearCart').addEventListener('click', event => {
  
  let promptMessage = `Thank you for shopping!!!\n\n`;
  promptMessage += `Here is a list of the items in your cart :\n\n`;

  cart.items.forEach(item => {
    promptMessage += `${item.name} - ${item.price} $ x ${item.quantity} = ${cart.getTotal()} $ \n`;
  });

  window.alert(promptMessage);

  cart.items = [];
  cart.saveCart();
  updateCart();

});

// Update cart
function updateCart() {
  let cartItems = document.querySelector('#cart-items');
  let cartTotal = document.querySelector('#cart-total');
  cartItems.innerHTML = '';
  
  cart.items.forEach(item => {
    let li = document.createElement('li');
    li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} <button class="btnRemove" data-name="${item.name}">Remove</button>`;
    cartItems.appendChild(li);
  });
  
  cartTotal.innerHTML = cart.getTotal();
  
  if (cart.getCount() === 0) {
    document.querySelector('#cart').classList.remove('has-items');
  } else {
    document.querySelector('#cart').classList.add('has-items');
  }
 
  // Add event listeners to remove from cart buttons
  document.querySelectorAll('.btnRemove').forEach(button => {
    button.addEventListener('click', event => {
      let name = button.getAttribute('data-name');
      cart.removeItem(name);
      updateCart();
    });
  });
}
