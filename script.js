/*==================================================
ASHTAMI SHOPPING CART
==================================================*/

// Get Cart
function getCart() {

    return JSON.parse(localStorage.getItem("cart")) || [];

}

// Save Cart
function saveCart(cart) {

    localStorage.setItem("cart", JSON.stringify(cart));

}

// Cart Count
function updateCartCount() {

    let cart = getCart();

    let count = 0;

    cart.forEach(item => {

        count += item.quantity;

    });

    const cartIcons = document.querySelectorAll(".cart-count");

    cartIcons.forEach(icon => {

        icon.innerText = count;

    });

}

// Run on every page

updateCartCount();
/*==================================================
ADD TO CART
==================================================*/

function addToCart(id, name, price, image, variant = "") {

    let cart = getCart();

    const existingProduct = cart.find(item =>
        item.id === id && item.variant === variant
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: id,

            name: name,

            price: price,

            image: image,

            variant: variant,

            quantity: 1

        });

    }

    saveCart(cart);

    updateCartCount();

    alert(name + " has been added to your cart!");

}
/*==================================================
LOAD CART
==================================================*/

function loadCart() {

    const cartContainer = document.getElementById("cartItems");

    if (!cartContainer) return;

    let cart = getCart();

    if (cart.length === 0) {

        cartContainer.innerHTML = `

        <div class="empty-cart">

            <h2>Your Cart is Empty</h2>

            <p>Add some delicious homemade products.</p>

            <a href="category.html" class="btn btn-primary">

                Continue Shopping

            </a>

        </div>

        `;

        return;

    }

    let html = "";

    cart.forEach(item => {

        html += `

        <div class="cart-card">

            <div class="cart-image">

                <img src="${item.image}" alt="${item.name}">

            </div>

            <div class="cart-details">

                <h3>${item.name}</h3>

                <p>${item.variant}</p>

                <div class="cart-price">

                    ₹${item.price}

                </div>

            </div>

            <div class="quantity-box">

                <button onclick="decreaseQty('${item.id}','${item.variant}')">-</button>

                <input type="text" value="${item.quantity}" readonly>

                <button onclick="increaseQty('${item.id}','${item.variant}')">+</button>

            </div>

            <div class="item-total">

                ₹${item.price * item.quantity}

            </div>

            <div class="remove-item">

                <i class="fa-solid fa-trash"

                onclick="removeItem('${item.id}','${item.variant}')">

                </i>

            </div>

        </div>

        `;

    });

    cartContainer.innerHTML = html;

    calculateTotal();

}
/*==================================================
INCREASE QUANTITY
==================================================*/

function increaseQty(id, variant = "") {

    let cart = getCart();

    cart.forEach(item => {

        if(item.id === id && item.variant === variant){

            item.quantity++;

        }

    });

    saveCart(cart);

    loadCart();

    updateCartCount();

}


/*==================================================
DECREASE QUANTITY
==================================================*/

function decreaseQty(id, variant = "") {

    let cart = getCart();

    cart.forEach(item => {

        if(item.id === id && item.variant === variant){

            if(item.quantity > 1){

                item.quantity--;

            }

        }

    });

    saveCart(cart);

    loadCart();

    updateCartCount();

}


/*==================================================
REMOVE ITEM
==================================================*/

function removeItem(id, variant = "") {

    let cart = getCart();

    cart = cart.filter(item => !(item.id === id && item.variant === variant));

    saveCart(cart);

    loadCart();

    updateCartCount();

}


/*==================================================
CALCULATE TOTAL
==================================================*/

function calculateTotal() {

    let cart = getCart();

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });

    const subtotalElement = document.getElementById("subtotal");

    const totalElement = document.getElementById("grandTotal");

    if(subtotalElement){

        subtotalElement.innerText = "₹" + subtotal;

    }

    if(totalElement){

        totalElement.innerText = "₹" + subtotal;

    }

}
/*==================================================
AUTO LOAD
==================================================*/

document.addEventListener("DOMContentLoaded", function(){

    updateCartCount();
/*=========================
HAMBURGER MENU
=========================*/

/*==========================
RESPONSIVE NAVBAR
==========================*/

const menuBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click",function(){

    nav.classList.toggle("show-menu");

});


const dropdown = document.querySelector(".dropdown");

dropdown.addEventListener("click",function(e){

    if(window.innerWidth <= 1024){

        e.preventDefault();

        dropdown.classList.toggle("show-dropdown");

    }

});
