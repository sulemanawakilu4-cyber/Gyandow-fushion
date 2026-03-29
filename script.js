// ===== PRODUCTS & CART =====
let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = [];

// ===== DISPLAY PRODUCTS =====
function displayProducts() {
    let list = document.getElementById("product-list");
    list.innerHTML = "";

    products.forEach((p, index) => {
        list.innerHTML += `
        <div class="card">
            <img src="${p.img}" />
            <h3>${p.name}</h3>
            <p>GHS ${p.price}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        </div>`;
    });
}

// ===== ADD PRODUCT =====
function addProduct() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let img = document.getElementById("image").value;

    if(name && price && img){
        products.push({name, price, img});

        // SAVE permanently
        localStorage.setItem("products", JSON.stringify(products));

        displayProducts();
        alert("Product Added!");

        // clear inputs
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("image").value = "";
    } else {
        alert("Fill all fields!");
    }
}

// ===== ADD TO CART =====
function addToCart(index) {
    cart.push(products[index]);
    updateCart();
}

// ===== UPDATE CART =====
function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {
        total += Number(item.price);
        cartItems.innerHTML += `<li>${item.name} - GHS ${item.price}</li>`;
    });

    document.getElementById("total").innerText = total;
}

// ===== WHATSAPP ORDER =====
function orderWhatsApp() {
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    let message = "Hello, I want to order:\\n";

    cart.forEach(item => {
        message += item.name + " - GHS " + item.price + "\\n";
    });

    let phone = "233245812973"; // your number
    let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

// ===== LOAD PRODUCTS ON START =====
displayProducts();