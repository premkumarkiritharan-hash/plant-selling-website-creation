// Select cart and cart button
let cart = document.querySelector('.cart-items-container');
let cartBtn = document.querySelector('#cart-btn');

// Toggle cart open/close
cartBtn.onclick = () => {
  cart.classList.toggle('active');
};

// Add to Cart Buttons
let addCartButtons = document.querySelectorAll('.add-cart');
addCartButtons.forEach(button => {
  button.addEventListener('click', addCartClicked);
});

// Add Item to Cart
function addCartClicked(event) {
  let productBox = event.target.parentElement;
  let title = productBox.querySelector('.product-title').innerText;
  let price = productBox.querySelector('.price').innerText;
  let image = productBox.querySelector('img').src;
  addProductToCart(title, price, image);
  updateTotal();
}

// Create Cart Item
function addProductToCart(title, price, image) {
  let cartContent = document.querySelector('.cart-content');

  // Prevent duplicate items
  let cartItems = cartContent.getElementsByClassName('cart-product-title');
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].innerText === title) {
      alert("This item is already in the cart");
      return;
    }
  }

  let cartBox = document.createElement('div');
  cartBox.classList.add('cart-box');
  cartBox.innerHTML = `
    <img src="${image}" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="bx bxs-trash-alt cart-remove"></i>
  `;
  cartContent.append(cartBox);

  // Add event listeners for new item
  cartBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
  cartBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);
}

// Remove Item
function removeCartItem(event) {
  event.target.parentElement.remove();
  updateTotal();
}

// Quantity Change
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Update Total
function updateTotal() {
  let cartContent = document.querySelector('.cart-content');
  let cartBoxes = cartContent.querySelectorAll('.cart-box');
  let total = 0;

  cartBoxes.forEach(cartBox => {
    let priceElement = cartBox.querySelector('.cart-price');
    let quantityElement = cartBox.querySelector('.cart-quantity');
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total += price * quantity;
  });

  document.querySelector('.total-price').innerText = "$" + total.toFixed(2);
}

// Buy Now Button
document.querySelector('.btn-buy').addEventListener('click', () => {
  alert("Your order is placed!");
  document.querySelector('.cart-content').innerHTML = "";
  updateTotal();
  cart.classList.remove('active');
});
