// localStorage.setItem('searching','shirts');
let productData;
fetch(productApi)
  .then((response) => response.json())
  .then((products) => {
    productData = products;
    var container = document.getElementById("body");
    var htmls = "";
    products.forEach((element) => {
      if ((element.status == "Enabled")) {
        htmls += `
        <div class="col-sm-3 col-6" id="item-${element.id}" onmouseover="addHoverEffect(this)" onmouseout="removeHoverEffect(this)" onclick="transferPage(${element.id})">
            <img class="mb-3 responsive-image" src="${element.img.url}" alt="">
            <p class="mb-1 font-weight-bold title text-center">${element.name} </p>
            <span class="start item-start">${element.vote}</span>
            <p class="font-weight-bold text-center">${element.price} $</p>
        </div>
    `;
      }
    });
    container.innerHTML = htmls;
  });


checkFilter();
function checkFilter() {
  let category = window.localStorage.getItem("category");
  if (category) {
    filterByCategory(category);
  }
}

checkBrand();
function checkBrand() {
  let brand = window.localStorage.getItem("brand");
  if (brand) {
    filterByBrand(brand);
  }
}

checkSearching();
function checkSearching() {
  fetch(productApi)
    .then((response) => response.json())
    .then((products) => {
      let searchingData = localStorage.getItem('searching');
      if (searchingData) {
        var container = document.getElementById('body');
        var htmls = '';
        var filteredProducts = products.filter((element) =>
          element.name.toLowerCase().indexOf(searchingData.toLowerCase()) >= 0
        );

        filteredProducts.forEach((element) => {
          if (element.status === 'Enabled') {
            htmls += `
              <div class="col-sm-3 col-6" id="item-${element.id}" onmouseover="addHoverEffect(this)" onmouseout="removeHoverEffect(this)" onclick="transferPage(${element.id})">
                <img class="mb-3" src="${element.img.url}" alt="">
                <p class="mb-1 font-weight-bold title text-center">${element.name}</p>
                <span class="start item-start">${element.vote}</span>
                <p class="font-weight-bold text-center">${element.price}</p>
              </div>
            `;
          }
        });
        container.innerHTML = htmls;
        localStorage.removeItem("searching");
      }
    });

}

// Lọc sản phẩm
function filterByCategory(categoryName) {

  fetch(productApi)
    .then((response) => response.json())
    .then((products) => {
      var container = document.getElementById("body");
      var htmls = "";
      products
        .filter((element) => element.category === categoryName)
        .forEach((element) => {
          if ((element.status == "Enabled")) {
            htmls += `
            <div class="col-sm-3 col-6" id="item-${element.id}" onmouseover="addHoverEffect(this)" onmouseout="removeHoverEffect(this)" onclick="transferPage(${element.id})">
            <img class="mb-3" src="${element.img.url}" alt="">
            <p class="mb-1 font-weight-bold title text-center">${element.name}</p>
            <span class="start item-start">${element.vote}</span>
            <p class="font-weight-bold text-center">${element.price} $</p>
          </div>
        `;
          }
        });
      container.innerHTML = htmls;
    });
  localStorage.removeItem("category");
}

// Lọc Brand
function filterByBrand(categoryBrand) {
  fetch(productApi)
    .then((response) => response.json())
    .then((products) => {
      var container = document.getElementById("body");
      var htmls = "";
      products
        .filter((element) => element.brand === categoryBrand)
        .forEach((element) => {
          if ((element.status == "Enabled")) {
            htmls += `
            <div class="col-sm-3 col-6" id="item-${element.id}" onmouseover="addHoverEffect(this)" onmouseout="removeHoverEffect(this)" onclick="transferPage(${element.id})">
            <img class="mb-3" src="${element.img.url}" alt="">
            <p class="mb-1 font-weight-bold title text-center">${element.name}</p>
            <span class="start item-start">${element.vote}</span>
            <p class="font-weight-bold text-center">${element.price} $</p>
          </div>
        `;
          }
        });
      localStorage.removeItem("brand");
      container.innerHTML = htmls;
    });
}
function highlightBrand(event, brand) {
  // Xóa lớp 'fw-bold' khỏi tất cả các phần tử <a> trong danh sách
  var links = document.querySelectorAll('.list-unstyled a');
  links.forEach(function (link) {
    link.classList.remove('fw-bold');
  });

  // Thêm lớp 'fw-bold' cho phần tử được nhấn
  var target = event.target;
  target.classList.add('fw-bold');
  // Thực hiện các hành động khác tại đây, ví dụ: lọc dữ liệu theo brand
  filterByBrand(brand);
}
// Lọc màu
var colorRadios = document.querySelectorAll('input[name="color"]');
colorRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    var selectedColor = this.value;
    fetch(productApi)
      .then((response) => response.json())
      .then((products) => {
        var container = document.getElementById("body");
        var htmls = "";
        products
          .filter((element) => element.img.color === selectedColor)
          .forEach((element) => {
            if ((element.status == "Enabled")) {
              htmls += `
            <div class="col-sm-3 col-6" id="item-${element.id}" onmouseover="addHoverEffect(this)" onmouseout="removeHoverEffect(this)" onclick="transferPage(${element.id})">
            <img class="mb-3" src="${element.img.url}" alt="">
            <p class="mb-1 font-weight-bold title text-center">${element.name}</p>
            <span class="start item-start">${element.vote}</span>
            <p class="font-weight-bold text-center">${element.price} $</p>
          </div>
            `;
            }
          });
        container.innerHTML = htmls;
      });
  });
});

// Lọc Size
function filterBySize() {
  var checkboxes = document.getElementsByName("size");
  var selectedSizes = [];

  // Nhận kích thước đã chọn
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedSizes.push(checkbox.value);
    }
  });

  fetch(productApi)
    .then((response) => response.json())
    .then((products) => {
      var container = document.getElementById("body");
      var htmls = "";

      // Lọc sản phẩm dựa trên kích thước đã chọn hoặc hiển thị tất cả sản phẩm nếu không chọn kích thước
      var filteredProducts =
        selectedSizes.length > 0
          ? products.filter((element) =>
            selectedSizes.every((size) => element.size.includes(size))
            // element.size.join("").includes(selectedSizes.join(""))
          )
          : products;
      console.log(filteredProducts);
      console.log(selectedSizes);
      // Tạo HTML cho các sản phẩm được lọc
      filteredProducts.forEach((element) => {
        if ((element.status == "Enabled")) {
          htmls += `
          <div class="col-sm-3 col-6" id="item-${element.id}" onmouseover="addHoverEffect(this)" onmouseout="removeHoverEffect(this)" onclick="transferPage(${element.id})">
          <img class="mb-3" src="${element.img.url}" alt="">
          <p class="mb-1 font-weight-bold title text-center">${element.name}</p>
          <span class="start item-start">${element.vote}</span>
          <p class="font-weight-bold text-center">${element.price} $</p>
        </div>
          `;
        }
      });
      // console.log(htmls);

      container.innerHTML = htmls;
    });
}

// Show product_detail
function transferPage(id) {
  window.location.href = "product_detail.html";
  window.localStorage.setItem("itemID", id);
}

function addHoverEffect(element) {
  element.classList.add("hover-effect");
}

function removeHoverEffect(element) {
  element.classList.remove("hover-effect");
}
// function animateImage(event) {
//   event.currentTarget.querySelector('img').classList.add('image-animation');
// }

// function resetImage(event) {
//   event.currentTarget.querySelector('img').classList.remove('image-animation');
// }
