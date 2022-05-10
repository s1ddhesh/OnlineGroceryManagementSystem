const cartItems = document.querySelector('.cart-items')

async function fetchCart() {
    const res = await fetch('/cart-items')

    if (!res.ok) {
        alert('Error fetching cart')
        return
    }

    const data = await res.json()

    let total = 0
    data.cart.forEach(item => {
        const card = document.createElement('div')
        card.className = 'cart-item'
        card.innerHTML = `        
        <h3 class="cart-item-name">${item.name}</h3>
        <h3 class="cart-item-price">${item.price} Rs</h3>`

        cartItems.appendChild(card)

        total += item.price
    })

    cartItems.innerHTML += `
    <div class="cart-item">
        <h1 class="cart-item-name">TOTAL</h1>
        <h1 class="cart-item-price">${total} Rs</h1>
    </div>
    `
}


fetchCart()