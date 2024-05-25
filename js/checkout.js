const orderApi = " http://localhost:3000/orders";
const userId = localStorage.getItem("userId");
fetch(userApi)
  .then((res) => res.json())
  .then((data) => {
    user = data.find((e) => e.id == userId);
    document.getElementById("name").value = user.userName;
    document.getElementById("phone").value = user.phone;
    document.getElementById("address").value = user.address;
  });

fetch(cartApi)
  .then((res) => res.json())
  .then((data) => {
    const cart = data.find((e) => e.id == userId);
    let orderTable = document.querySelector("#orderTable");
    let htmls = "";
    let total = 0;
    let qrProductsData = "";
    fetch(productApi)
      .then((res) => res.json())
      .then((productsData) => {
        cart.productsCart.forEach((e) => {
          let product = productsData.find(
            (element) => element.id == e.productId
          );
          htmls += `
                        <tr>
                            <td><img src="${
                              product.img.url
                            }" alt="img" width="50px"> ${product.name}</td>
                            <td>${e.size}</td>
                            <td>${e.color}</td>
                            <td>${e.quantity}</td>
                            <td>$${
                              (Math.round(parseInt(product.price) - (parseInt(product.price) * parseInt(product.discountAmount)) / 100)) * e.quantity
                            }</td>
                        </tr>`;
          qrProductsData += `%0AName: ${product.name}; Size: ${e.size}; Color: ${e.color};Quantity: ${e.quantity}; Price: $${Math.round(parseInt(product.price) - (parseInt(product.price) * parseInt(product.discountAmount)) / 100)} `;
            total += parseFloat(Math.round(parseInt(product.price) - (parseInt(product.price) * parseInt(product.discountAmount)) / 100)) * e.quantity;
        });
        orderTable.innerHTML = htmls;
        document.querySelector("#total").innerHTML += `$${total}`;
      });
    //handle checkout
    let checkoutButton = document.querySelector("#checkout");
    checkoutButton.addEventListener("click", () => {
      let qr =
        "Name: " +
        document.getElementById("name").value +
        "%0APhone: " +
        $("#phone").val() +
        "%0AAddress: " +
        $("#address").val() +
        qrProductsData;
      let order = {
        name: $("#name").val(),
        phone: $("#phone").val(),
        address: $("#address").val(),
        userId: userId,
        products: cart.productsCart,
        total: total,
      };
      $("#contentOrder").val(qr.replace(/%0A/g, "\n"));
      $("#email").val(user.email);
      sentEmail("template_ifj5fro", "formEmail");
      document.querySelector(
        "#checkoutBody"
      ).innerHTML = `<p class="text-bg-success fs-3 col-sm-6 text-center ms-auto me-auto">Payment success!</p>
                <div class="text-center m-5">
                    <img id='barcode' src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100" alt="QR payment information" title="QR payment information" width="200" height="200"/>
                </div>`;
      createOrder(order);
      changeNumberItem(null);
      updateCart({ id: userId, productsCart: [] });
      generateBarCode(qr, total);
    });
  });

function generateBarCode(qr, total) {
  var url =
    "https://api.qrserver.com/v1/create-qr-code/?data=" +
    qr +
    `%0ATotal price: $${total}` +
    "&amp;size=200x200";
  $("#barcode").attr("src", url);
}

function createOrder(data) {
  let option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(orderApi, option).then((response) => response.json());
}

function updateCart(data) {
  const options = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  fetch(`${cartApi}/${userId}`, options).then((res) => res.json());
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
});
