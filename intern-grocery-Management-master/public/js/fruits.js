const shopItems = document.querySelector(".shop-items");

async function fetchFruits() {
  const result = await fetch("/products/fruits");
  const data = await result.json();

  data.forEach((fruit) => {
    const card = document.createElement("div");
    card.className = "shop-item-card";
    card.innerHTML = `
        <span class="shop-item-tittle">${fruit.name}</span>

        <img class="shop-item-image" src="imagers\\${fruit.img}" height="250px" width="250px">
        <div class="shop-item-details">
            <span class="shop-item-price">${fruit.price} Rs</span>
            <button class="btn btn-primary shop-item-button add-to-cart-btn" type="button">ADD TO CART</button>
        </div>
        `;

    card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
      addToCart(fruit.name, fruit.price);
    });

    shopItems.appendChild(card);
  });
}

async function addToCart(name, price) {
  const res = await fetch("/add-to-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
    }),
  });

  if (!res.ok) {
    window.location.href = "/auth/login";
  } else {
    alert("item added to cart successfully");
  }
}

fetchFruits();
