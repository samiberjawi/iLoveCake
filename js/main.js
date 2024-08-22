
        // JavaScript code to manage the shopping cart
        var cart = [];
    
        // Select all "Add to cart" buttons
        var buttons = document.querySelectorAll('.btn-pink, .btn-blue');
    
        // Add event listeners to buttons
        buttons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                var itemName = this.closest('.fruite-item').querySelector('h4').textContent;
                var itemPrice = parseFloat(this.closest('.d-flex').querySelector('p').textContent.replace('$', ''));
                addToCart(itemName, itemPrice);
            });
        });
    
        // Function to add items to the cart
        function addToCart(itemName, itemPrice) {
            var itemExists = false;
    
            // Check if the item already exists in the cart
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].name === itemName) {
                    cart[i].quantity++;
                    cart[i].total = cart[i].quantity * cart[i].price;
                    itemExists = true;
                    break;
                }
            }
    
            // If the item does not exist, add a new item to the cart
            if (!itemExists) {
                var item = {
                    name: itemName,
                    price: itemPrice,
                    quantity: 1,
                    total: itemPrice
                };
                cart.push(item);
            }
    
            updateCart();
        }
    
        // Function to update the cart display
        function updateCart() {
            var cartItems = document.getElementById('cart-items');
            var cartTotal = document.getElementById('cart-total');
            cartItems.innerHTML = ''; // Clear the current cart items
            var total = 0;
    
            // Loop through the cart and create table rows for each item
            cart.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.total.toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">Remove</button></td>
                `;
                cartItems.appendChild(row);
                total += item.total;
            });
    
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        }
    
        // Function to remove items from the cart
        function removeFromCart(itemName) {
            cart = cart.filter(item => item.name !== itemName);
            updateCart();
        }