var cartsApi = " http://localhost:3000/carts";
var testCart = document.getElementById("testCart");

renderDetail();

function renderDetail() {
  fetch(productApi)
    .then((res) => res.json())
    .then((products) => {
      var productDetail = document.getElementById("productDetail");
      let id = window.localStorage.getItem("itemID");
      let product = products.find((item) => item.id == id);

      let sizeOptionsHTML = Array.isArray(product.size)
        ? product.size
            .map((size) => `<option value="${size}">${size}</option>`)
            .join("")
        : "";
      var htmls = "";
      let oldPrice = parseInt(product.price); 
      let discount = parseInt(product.discountAmount);
      let currentPrice = oldPrice - (oldPrice * discount) / 100;
      let roundedPrice = Math.round(currentPrice);
      console.log(products);
      htmls += `
        <div class="container">
            <div class="row mt-5">
                <div class="col-sm-4 col-12">
                    <div class="image-container d-flex justify-content-center">
                        <img class="image1" src="${product.img["url"]}" alt="image" id="main-image">
                    </div>
                </div>
                <div class="col-sm-6 col-12 heading" data-product-id="${product.id}">
                    <h1 class="fw-bold">${product.title}</h1>
                    <span class="star">${product.vote}</span>
                    <div class="containerPrice">
                        <p class="fs-2 price">${roundedPrice}$
                        <span class="fs-2 dis">${oldPrice}$</span>
                        <div class="discountPercent text-center">
                            -${discount}%
                        </div>
                    </p>
                    </div>
                    
                    <p class="sentence">${product.description}</p>
                    <hr>
                    <div class="row">
                        <div class="col-sm-5 col-12 colorOptions">
                            <p class="sentence">Select Colors</p>
                        </div>
                        <div class="col-sm-3 col-6">
                            <p class="sentence ">Choose Size</p>
                            <div class="sizeOption">
                                <select name="size" id="sizeOptions">
                                    <option value="empty">Select size</option>
                                    ${sizeOptionsHTML};
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-2 col-6">
                            <p class="sentence qty">Quantity</p>
                            <input aria-label="quantity" class="input-qty" max="${product.stock}" min="1" name="" type="number" value="1">
                        </div> 
                    </div>
                    <hr>
                    <div class="addCart">
                        <button type="button" class="btn btn-primary addToCart" onclick = "AddToCart()">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>`;
      productDetail.innerHTML = htmls;

      // Lấy các phần tử cần thiết từ DOM
      const colorOptionsContainer = document.querySelector(".colorOptions");

      // Lấy thông tin về màu sắc từ dữ liệu JSON
      const color1 = product.img.color;
      const color2 = product.img.color2;
      const color3 = product.img.color3;
      const color4 = product.img.color4;

      // Tạo checkbox cho từng màu sắc và thêm vào container
      if (color1) {
        const label1 = createColorCheckbox(color1);
        colorOptionsContainer.appendChild(label1);
      }
      if (color2) {
        const label2 = createColorCheckbox(color2);
        colorOptionsContainer.appendChild(label2);
      }
      if (color3) {
        const label3 = createColorCheckbox(color3);
        colorOptionsContainer.appendChild(label3);
      }
      if (color4) {
        const label4 = createColorCheckbox(color4);
        colorOptionsContainer.appendChild(label4);
      }

      // Hàm tạo checkbox cho một màu sắc
      function createColorCheckbox(color) {
        const label = document.createElement("label");
        label.classList.add("radio", color);
        label.setAttribute("for", color);

        const input = document.createElement("input");
        input.type = "radio";
        input.classList.add("option");
        input.id = color;
        input.name = "option";
        input.value = color;
        // thêm input thành element con của lable
        label.appendChild(input);
        return label;
      }
      const colors = [
        "brown",
        "green",
        "pink",
        "red",
        "blue",
        "white",
        "orange",
        "black",
      ];

      for (let i = 0; i < product.length; i++) {
        const label = createColorCheckbox(colors[i]);
        colorOptionsContainer.appendChild(label);
      }
      filterByCategory(product.category);
    });
}

// Lọc sản phẩm liên quan đến products
function filterByCategory(categoryName) {
  fetch(productApi)
    .then((response) => response.json())
    .then((products) => {
      var container = document.getElementById("relatedClothes");
      var htmls = `<div class="row text-center p-2">
                            <h2>Related clothes</h2>
                        </div>`;
      let id = window.localStorage.getItem("itemID");
      // Lấy ID của sản phẩm hiện tại từ localStorage
      let check = false;
      products
        .filter((e) => e.category === categoryName)
        .forEach((e) => {
          if (e.id != id && e.status == "Enabled") {
            check = true;
            htmls += `
                  <div class="col-sm-3 text-center hoverProducts" id="item-${e.id}" onclick="handleStransferToProductDetail(${e.id})">
                        <img class="mb-3 image_product" src="${e.img.url}" alt="">
                        <p class="mb-1 fw-bold">${e.name}</p>
                        <span class="star">${e.vote}</span>
                        <p class="fw-bold fs-4">${e.price}$</p>
                    </div>`;
          }
        });
      if (check) {
        container.innerHTML = htmls;
      }
    });
}
// Show product_detail
function handleStransferToProductDetail(id) {
  window.localStorage.setItem("itemID", id);
  renderDetail();
}

function AddToCart() {
  var selectSize = document.getElementById("sizeOptions").value;
  const selectedColor = document.querySelector('input[name="option"]:checked');
  if ("userId" in localStorage) {
    if (!selectedColor) {
      alert("Please select a color before adding to cart!!");
    } else if (selectSize == "empty") {
      alert("Please select size before adding to cart!");
    } else if (document.querySelector(".input-qty").value <= 0) {
      alert("Please enter a minimum quantity of 1!");
    } else {
      fetch(cartsApi)
        .then((res) => res.json())
        .then((data) => {
          let carts = data;
          const userID = window.localStorage.getItem("userId");
          let productId;
          let size = "";
          let color = "";
          let quantity = "";
          // Lấy thông tin từ các phần tử HTML tương ứng trên trang
          let selectedSizeOption = document.getElementById("sizeOptions");
          size = selectedSizeOption.value;

          let selectedColorOption = document.querySelector(
            'input[name="option"]:checked'
          );
          color = selectedColorOption.value;

          let quantityInput = document.querySelector(".input-qty");
          quantity = quantityInput.value;

          let productElement = document.querySelector(".heading");
          productId = productElement.dataset.productId;

          let userCart = carts.find((user) => user.id == userID);
          if (userCart) {
            const newProductCart = {
              productId: productId,
              size: size,
              color: color,
              quantity: quantity,
            };
            let arr = userCart.productsCart;
            arr.push(newProductCart);
            changeNumberItem(arr.length);
            let option = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userCart),
            };
            fetch(cartsApi + "/" + userID, option).then((response) =>
              response.json()
            );
          } else {
            const newCart = {
              id: userID,
              productsCart: [
                {
                  productId: productId,
                  size: size,
                  color: color,
                  quantity: quantity,
                },
              ],
            };
            carts.push(newCart);
            let option = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newCart),
            };
            fetch(cartsApi, option).then((response) => response.json());
          }
          notify("Add to cart successfully!");
        });
    }
  } else {
    $("#modal1").modal("show");
    alert("Please log in before add!");
  }
}
