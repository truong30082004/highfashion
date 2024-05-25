function renderCart() {
  const userId = JSON.parse(localStorage.getItem("userId"));
  let subtotal = 0;
  let discount = 0;
  let totalPrice = 0;

  localStorage.setItem('cartApi', cartApi);
  localStorage.setItem('productApi', productApi);

  var tbody = document.getElementById('product-body');

  fetch(cartApi)
    .then(response => response.json())
    .then(carts => {
      cartsData = carts;
      let productsData;
      let cart = carts.find(cart => cart.id == userId);

      fetch(productApi)
        .then(res => res.json())
        .then(products => {
          productsData = products;
          //
          const htmls = cart.productsCart.map(element => {
            let product = productsData.find(item => item.id == element.productId);
            subtotal += Math.round(parseInt(product.price) - (parseInt(product.price) * parseInt(product.discountAmount)) / 100) * parseInt(element.quantity);

            return `
              <div class="row mt-4">
                <div class="col-5">
                  <img src="${product.img.url}" alt="T-shirt">
                </div>
                <div class="col-4">
                <h3>${product.name}</h3> 
                  <p> Size: ${element.size}</p>                  
                  <p>Color: ${element.color}</p>                  
                  <p>$: ${Math.round(parseInt(product.price) - (parseInt(product.price) * parseInt(product.discountAmount)) / 100)}</p>
                </div>
                <div class="col-3 flex-column">
                  <div class="icon-cart">
                    <i class="fa fa-trash" style="color:red" onclick="deleteCartItem(${element.productId})"></i>
                  </div>
                  <div class="nut">
                  <input class="minus is-form" type="button" value="-" onclick="changeQuantity(${element.productId},-1)">
                  <input aria-label="quantity" class="input-qty" max="Số tối đa" min="1" name="" type="number" value="${element.quantity}" onchange="updateCartItem(this, ${element.productId})">
                  <input class="plus is-form" type="button" value="+" onclick="changeQuantity(${element.productId},1)">
                  </div>
                </div>
              </div>
              <hr>`;
          });

          discount = subtotal ;
          totalPrice = subtotal ;
          document.getElementById('subtotal').innerHTML = `$${subtotal}`;
          document.getElementById('totalPrice').innerHTML = `$${totalPrice}`;
          tbody.innerHTML = htmls.join('');
        });
    });
}

renderCart();


function changeQuantity(productId, increment) {
  const userId = localStorage.getItem("userId");

  fetch(`${cartApi}/${userId}`)
    .then(response => response.json())
    .then(cart => {
      const product = cart.productsCart.find(item => item.productId == productId);
      console.log(product,productId);
      product.quantity = parseInt(product.quantity) + parseInt(increment);
      const options = {
        method: "PUT",
        body: JSON.stringify(cart),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      fetch(`${cartApi}/${userId}`, options)
        .then(res => res.json())
        .then(data => renderCart());
    });
}

function deleteCartItem(id) {
  const userId = localStorage.getItem("userId");
  fetch(`${cartApi}/${userId}`)
    .then(response => response.json())
    .then(carts => {
      const productAfterUpdated = carts.productsCart.filter(e => e.productId != id);

      carts.productsCart = productAfterUpdated;
      const options = {
        method: "PUT",
        body: JSON.stringify(carts),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      fetch(`${cartApi}/${userId}`, options)

        .then(res => res.json())
        .then(data => renderCart());
    });
}