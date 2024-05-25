const tbody = document.querySelector("#tbody");
let productOption = document.getElementById("product-option");
let userOption = document.getElementById("user-option");
let orderOption = document.getElementById("order-option");
let orderApi = " http://localhost:3000/orders";
start();
function start() {
  productOption.addEventListener("click", handleCheckboxManagementClick);
  userOption.addEventListener("click", handleCheckboxManagementClick);
  orderOption.addEventListener("click", handleCheckboxManagementClick);
  let option = localStorage.getItem("option");
  if (option === "user") {
    getUsers(renderUserManagement);
    userOption.checked = true;
  } else if (option === "product") {
    getProducts(renderProductManagement);
    productOption.checked = true;
  } else {
    getOrders(renderOrderManagement);
    orderOption.checked = true;
  }
}

function getProducts(callback) {
  fetch(productApi)
    .then((response) => response.json())
    .then(callback);
}

function getUsers(callback) {
  fetch(userApi)
    .then((response) => response.json())
    .then(callback);
}

function getOrders(callback) {
  fetch(orderApi)
    .then((response) => response.json())
    .then(callback);
}

function handleCheckboxManagementClick(event) {
  if (event.target === productOption) {
    getProducts(renderProductManagement);
  } else if (event.target === userOption) {
    getUsers(renderUserManagement);
  }
  if (event.target === orderOption) {
    getOrders(renderOrderManagement);
  }
}

function renderProductManagement(products) {
  document.querySelector("#addButton").style.display = "block";
  localStorage.setItem("option", "product");
  productsData = products;
  document.querySelector("h1").innerHTML = "Product Management";
  document.querySelector(".modal-content").innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New product</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action="#">
            <div class="modal-body">
                <div class="mb-3">
                    <label for="pName-inp" class="col-form-label">Product name: <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="pName-inp" required>
                </div>
                <div class="mb-3">
                    <label for="price-inp" class="col-form-label">Price: <span class="text-danger">*</span></label>
                    <input type="number" class="form-control" min="0" id="price-inp" required>
                </div>
                <div class="mb-3">
                    <label for="title-inp" class="col-form-label">title: <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="title-inp" required>
                </div>
                <div class="mb-3">
                    <label for="discountAmount-inp" class="col-form-label">Discount amount: <span class="text-danger">*</span></label>
                    <input type="number" class="form-control" min="0" max="100" id="discountAmount-inp" required>
                </div>
                <div class="mb-3">
                    <label for="stock-inp" class="col-form-label">Stock: <span class="text-danger">*</span></label>
                    <input type="number" class="form-control" min="0" id="stock-inp" required>
                </div>
                <div class="mb-3">
                    <label for="description-inp" class="col-form-label">Description: <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="description-inp" required>
                </div>
                <div class="mb-3">
                    <lable for="brand-inp " class="col-form-label">Brand: <span class="text-danger">*</span> </lable>
                    <select class="form-select" id="brand-inp" aria-label="Select a brand" required>
                        <option value="" disabled selected>Choose a brand</option>
                        <option value="zara">Zara</option>
                        <option value="gucci">Gucci</option>
                        <option value="prada">Prada</option>
                    </select>
                </div>
                <div class="mb-3">
                    <lable for="category-inp " class="col-form-label">Category: <span class="text-danger">*</span> </lable>
                    <select class="form-select" id="category-inp" aria-label="Select a category" required>
                        <option value="" disabled selected>Choose a category</option>
                        <option value="t-shirts">T-shirts</option>
                        <option value="shorts">Shorts</option>
                        <option value="shirts">Shirts</option>
                        <option value="hoodies">Hoodies</option>
                        <option value="jeans">Jeans</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="img1-inp" class="col-form-label">Image 1: <span class="text-danger">*</span></label>
                    <input type="url" class="form-control" id="img1-inp" required>
                </div>
                <div class="mb-3">
                    <lable for="color1-inp" class="col-form-label">Color 1: <span class="text-danger">*</span> </lable>
                    <select class="form-select" id="color1-inp" aria-label="Select a color" required>
                        <option value="" disabled selected>Choose a color</option>
                        <option value="black">Black</option>
                        <option value="blue">Blue</option>
                        <option value="brown">Brown</option>
                        <option value="green">Green</option>
                        <option value="orange">Orange</option>
                        <option value="pink">Pink</option>
                        <option value="red">Red</option>
                        <option value="white">White</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="img2-inp" class="col-form-label">Image 2:</label>
                    <input type="url" class="form-control" id="img2-inp">
                </div>
                <div class="mb-3">
                    <lable for="color2-inp" class="col-form-label">Color 2:</lable>
                    <select class="form-select" id="color2-inp" aria-label="Select a color">
                        <option value="" disabled selected>Choose a color</option>
                        <option value="black">Black</option>
                        <option value="blue">Blue</option>
                        <option value="brown">Brown</option>
                        <option value="green">Green</option>
                        <option value="orange">Orange</option>
                        <option value="pink">Pink</option>
                        <option value="red">Red</option>
                        <option value="white">White</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="img3-inp" class="col-form-label">Image 3:</label>
                    <input type="url" class="form-control" id="img3-inp">
                </div>
                <div class="mb-3">
                    <lable for="color3-inp" class="col-form-label">Color 3:</lable>
                    <select class="form-select" id="color3-inp" aria-label="Select a color">
                        <option value="" disabled selected>Choose a color</option>
                        <option value="black">Black</option>
                        <option value="blue">Blue</option>
                        <option value="brown">Brown</option>
                        <option value="green">Green</option>
                        <option value="orange">Orange</option>
                        <option value="pink">Pink</option>
                        <option value="red">Red</option>
                        <option value="white">White</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="img4-inp" class="col-form-label">Image 4:</label>
                    <input type="url" class="form-control" id="img4-inp">
                </div>
                <div class="mb-3">
                    <lable for="color4-inp" class="col-form-label">Color 4:</lable>
                    <select class="form-select" id="color4-inp" aria-label="Select a color">
                        <option value="" disabled selected>Choose a color</option>
                        <option value="black">Black</option>
                        <option value="blue">Blue</option>
                        <option value="brown">Brown</option>
                        <option value="green">Green</option>
                        <option value="orange">Orange</option>
                        <option value="pink">Pink</option>
                        <option value="red">Red</option>
                        <option value="white">White</option>
                    </select>
                </div>
                <div class="mb-3">
                    Size: <span class="text-danger">*</span><br>
                    <div class="btn-group">
                        <input type="checkbox" class="btn-check size-inp" id="S" value="S">
                        <label class="btn btn-outline-primary" for="S">S</label>
                    
                        <input type="checkbox" class="btn-check size-inp" id="M" value="M">
                        <label class="btn btn-outline-primary" for="M">M</label>
                    
                        <input type="checkbox" class="btn-check size-inp" id="L" value="L">
                        <label class="btn btn-outline-primary" for="L">L</label>
            
                        <input type="checkbox" class="btn-check size-inp" id="XL" value="XL">
                        <label class="btn btn-outline-primary" for="XL">XL</label>

                        <input type="checkbox" class="btn-check size-inp" id="XXL" value="XXL">
                        <label class="btn btn-outline-primary" for="XXL">XXL</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" id="addProduct">Add</button>
            </div>
        </form>`;
  document.querySelector("thead").innerHTML = `
        <tr class="table-dark">
            <th>ID</th>
            <th>Name</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Stock</th>
            <th>Brand</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
        </tr>`;
  let items = "";
  products.forEach((item) => {
    let id = item.id;
    items += `
                <tr class="item-id-${item.id}">
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.title}</td>
                    <td>${item.category}</td>
                    <td>${item.price}</td>
                    <td>${item.discountAmount}</td>
                    <td>${item.stock}</td>
                    <td>${item.brand}</td>
                    <td>
                        <img src="${item.img.url}" alt="img" width="50px">
                    </td>
                    <td>${item.status}</td>
                    <td>
                        <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#update${id}" onclick="passDataProductsBeforeUpdate(${id})">Update</button>
                        <div class="modal fade" id="update${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Update product</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form action="#">
                                        <div class="modal-body">
                                            <div class="mb-3">
                                                <label for="pName-update-${item.id}" class="col-form-label">Product name: <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="pName-update-${item.id}" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="price-update-${item.id}" class="col-form-label">Price: <span class="text-danger">*</span></label>
                                                <input type="number" class="form-control" id="price-update-${item.id}" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="title-update-${item.id}" class="col-form-label">Title: <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="title-update-${item.id}" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="discountAmount-update-${item.id}" class="col-form-label">Discount amount: <span class="text-danger">*</span></label>
                                                <input type="number" class="form-control" id="discountAmount-update-${item.id}" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="stock-update-${item.id}" class="col-form-label">Stock: <span class="text-danger">*</span></label>
                                                <input type="number" class="form-control" id="stock-update-${item.id}" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="description-update-${item.id}" class="col-form-label">Description: <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="description-update-${item.id}" required>
                                            </div>
                                            <div class="mb-3">
                                                <lable for="brand-update-${item.id} " class="col-form-label">Brand: <span class="text-danger">*</span> </lable>
                                                <select class="form-select" id="brand-update-${item.id}" aria-label="Select a brand" required>
                                                    <option value="" disabled selected>Choose a brand</option>
                                                    <option value="zara">Zara</option>
                                                    <option value="gucci">Gucci</option>
                                                    <option value="prada">Prada</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <lable for="category-update-${item.id} " class="col-form-label">Category: <span class="text-danger">*</span> </lable>
                                                <select class="form-select" id="category-update-${item.id}" aria-label="Select a category" required>
                                                    <option value="" disabled selected>Choose a category</option>
                                                    <option value="t-shirts">T-shirts</option>
                                                    <option value="shorts">Shorts</option>
                                                    <option value="shirts">Shirts</option>
                                                    <option value="hoodies">Hoodies</option>
                                                    <option value="jeans">Jeans</option>
                                                    <option value="others">Others</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="img1-update-${item.id}" class="col-form-label">Image 1: <span class="text-danger">*</span></label>
                                                <input type="url" class="form-control" id="img1-update-${item.id}" required>
                                            </div>
                                            <div class="mb-3">
                                                <lable for="color1-update-${item.id}" class="col-form-label">Color 1: <span class="text-danger">*</span> </lable>
                                                <select class="form-select" id="color1-update-${item.id}" aria-label="Select a color" required>
                                                    <option value="" disabled selected>Choose a color</option>
                                                    <option value="black">Black</option>
                                                    <option value="blue">Blue</option>
                                                    <option value="brown">Brown</option>
                                                    <option value="green">Green</option>
                                                    <option value="orange">Orange</option>
                                                    <option value="pink">Pink</option>
                                                    <option value="red">Red</option>
                                                    <option value="white">White</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="img2-update-${item.id}" class="col-form-label">Image 2:</label>
                                                <input type="url" class="form-control" id="img2-update-${item.id}">
                                            </div>
                                            <div class="mb-3">
                                                <lable for="color2-update-${item.id}" class="col-form-label">Color 2:</lable>
                                                <select class="form-select" id="color2-update-${item.id}" aria-label="Select a color">
                                                    <option value="" disabled selected>Choose a color</option>
                                                    <option value="black">Black</option>
                                                    <option value="blue">Blue</option>
                                                    <option value="brown">Brown</option>
                                                    <option value="green">Green</option>
                                                    <option value="orange">Orange</option>
                                                    <option value="pink">Pink</option>
                                                    <option value="red">Red</option>
                                                    <option value="white">White</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="img3-update-${item.id}" class="col-form-label">Image 3:</label>
                                                <input type="url" class="form-control" id="img3-update-${item.id}">
                                            </div>
                                            <div class="mb-3">
                                                <lable for="color1-update-${item.id} " class="col-form-label">Color 3:</lable>
                                                <select class="form-select" id="color3-update-${item.id}" aria-label="Select a color">
                                                    <option value="" disabled selected>Choose a color</option>
                                                    <option value="black">Black</option>
                                                    <option value="blue">Blue</option>
                                                    <option value="brown">Brown</option>
                                                    <option value="green">Green</option>
                                                    <option value="orange">Orange</option>
                                                    <option value="pink">Pink</option>
                                                    <option value="red">Red</option>
                                                    <option value="white">White</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="img4-update-${item.id}" class="col-form-label">Image 4:</label>
                                                <input type="url" class="form-control" id="img4-update-${item.id}">
                                            </div>
                                            <div class="mb-3">
                                                <lable for="color1-update-${item.id} " class="col-form-label">Color 4:</lable>
                                                <select class="form-select" id="color4-update-${item.id}" aria-label="Select a color">
                                                    <option value="" disabled selected>Choose a color</option>
                                                    <option value="black">Black</option>
                                                    <option value="blue">Blue</option>
                                                    <option value="brown">Brown</option>
                                                    <option value="green">Green</option>
                                                    <option value="orange">Orange</option>
                                                    <option value="pink">Pink</option>
                                                    <option value="red">Red</option>
                                                    <option value="white">White</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                Size: <span class="text-danger">*</span><br>
                                                <div class="btn-group">
                                                    <input type="checkbox" class="btn-check" name="size-update-${item.id}" id="S-update-${item.id}" value="S">
                                                    <label class="btn btn-outline-primary" for="S-update-${item.id}">S</label>
                                                
                                                    <input type="checkbox" class="btn-check" name="size-update-${item.id}" id="M-update-${item.id}" value="M">
                                                    <label class="btn btn-outline-primary" for="M-update-${item.id}">M</label>
                                                
                                                    <input type="checkbox" class="btn-check" name="size-update-${item.id}" id="L-update-${item.id}" value="L">
                                                    <label class="btn btn-outline-primary" for="L-update-${item.id}">L</label>
                                        
                                                    <input type="checkbox" class="btn-check" name="size-update-${item.id}" id="XL-update-${item.id}" value="XL">
                                                    <label class="btn btn-outline-primary" for="XL-update-${item.id}">XL</label>
                                
                                                    <input type="checkbox" class="btn-check" name="size-update-${item.id}" id="XXL-update-${item.id}" value="XXL">
                                                    <label class="btn btn-outline-primary" for="XXL-update-${item.id}">XXL</label>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                Status:<span class="text-danger">*</span>
                                                <div class="btn-group">
                                                    <input type="radio" class="btn-check" name="status-update-${item.id}" id="Enabled-update-${item.id}" value="Enabled">
                                                    <label class="btn btn-outline-primary" for="Enabled-update-${item.id}">Enabled</label>
                                                    <input type="radio" class="btn-check" name="status-update-${item.id}" id="Disabled-update-${item.id}" value="Disabled">
                                                    <label class="btn btn-outline-primary" for="Disabled-update-${item.id}">Disabled</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-primary" id="updateProduct" onclick="checkAndHandleProductData(${id})">Accept</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
  });
  tbody.innerHTML = items;
  handleCreatProduct();
}

function renderUserManagement(users) {
  document.querySelector("#addButton").style.display = "block";
  localStorage.setItem("option", "user");
  usersData = users;
  document.querySelector("h1").innerHTML = "User Management";
  document.querySelector(".modal-content").innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New user</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form> 
            <div class="modal-body">
                <div class="mb-3">
                    <label for="uName-inp" class="col-form-label">User name: <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="uName-inp" required>
                </div>
                <div class="mb-3">
                    <label for="email-inp" class="col-form-label">Email: <span class="text-danger">*</span></label>
                    <input type="email" class="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" id="email-inp" required>
                </div>
                <div class="mb-3">
                    <label for="address-inp" class="col-form-label">Address: <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="address-inp" required>
                </div>
                <div class="mb-3">
                    <label for="phone-inp" class="col-form-label">Phone: <span class="text-danger">*</span></label>
                    <input type="tel" class="form-control" id="phone-inp" required pattern="^0[0-9]{9,10}$">
                </div>
                <div class="mb-3">
                    Role: <span class="text-danger">*</span>
                    <div class="btn-group">
                        <input type="radio" class="btn-check" name="role-inp" id="admin" value="admin">
                        <label class="btn btn-outline-primary" for="admin">Admin</label>
                        <input type="radio" class="btn-check" name="role-inp" id="user" value="user">
                        <label class="btn btn-outline-primary" for="user">User</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" id="addUser">Add</button>
            </div>
        </form>
    `;
  document.querySelector("thead").innerHTML = `
        <tr class="table-dark">
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
        </tr>`;
  let items = "";
  users.forEach((item) => {
    items += `
                <tr class="item-id-${item.id}">
                    <td>${item.id}</td>
                    <td>${item.userName}</td>
                    <td>${item.email}</td>
                    <td>${item.address}</td>
                    <td>${item.phone}</td>
                    <td>${item.role}</td>
                    <td>${item.status}</td>
                    <td>
                        <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#update${item.id}" onclick="passDataUsersBeforeUpdate(${item.id})">Update</button>
                        <div class="modal fade" id="update${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Update user</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form>
                                        <div class="modal-body">
                                            <div class="mb-3">
                                                <label for="uName-update-${item.id}" class="col-form-label">User name: <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="uName-update-${item.id}" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="email-update-${item.id}" class="col-form-label">Email: <span class="text-danger">*</span></label>
                                                <input type="email" class="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" id="email-update-${item.id}" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="address-update-${item.id}" class="col-form-label">Address: <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="address-update-${item.id}" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="phone-update-${item.id}" class="col-form-label">Phone: <span class="text-danger">*</span></label>
                                                <input type="tel" class="form-control" id="phone-update-${item.id}" required pattern="^0[0-9]{9,10}$">
                                            </div>
                                            <div class="mb-3">
                                                Role: <span class="text-danger">*</span>
                                                <div class="btn-group">
                                                    <input type="radio" class="btn-check" name="role-update-${item.id}" id="admin-update-${item.id}" value="admin">
                                                    <label class="btn btn-outline-primary" for="admin-update-${item.id}">Admin</label>
                                                    <input type="radio" class="btn-check" name="role-update-${item.id}" id="user-update-${item.id}" value="user">
                                                    <label class="btn btn-outline-primary" for="user-update-${item.id}">User</label>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                Status: <span class="text-danger">*</span>
                                                <div class="btn-group">
                                                    <input type="radio" class="btn-check" name="status-update-${item.id}" id="active-update-${item.id}" value="Active">
                                                    <label class="btn btn-outline-primary" for="active-update-${item.id}">Active</label>
                                                    <input type="radio" class="btn-check" name="status-update-${item.id}" id="unactive-update-${item.id}" value="Unactive">
                                                    <label class="btn btn-outline-primary" for="unactive-update-${item.id}">Unactive</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-primary" id="updateUser" onclick="checkAndHandleUserData(${item.id})">Accept</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
  });
  tbody.innerHTML = items;
  handleCreatUser();
}

function renderOrderManagement(orders) {
  localStorage.setItem("option", "order");
  document.querySelector("#addButton").style.display = "none";
  ordersData = orders;
  document.querySelector("h1").innerHTML = "Order Management";
  document.querySelector("thead").innerHTML = `
        <tr class="table-dark text-content">
            <th>ID</th>
            <th>User Name</th>
            <th>User ID</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Products</th>
            <th>Total</th>
        </tr>`;
  let items = "";
  orders.forEach((item) => {
    let products = "";
    item.products.forEach(
      (e) =>
        (products += `Id: ${e.productId}; Size: ${e.size}; Color: ${e.color}; Quantity: ${e.quantity} <br>`)
    );
    items += `
                <tr class="item-id-${item.id}">
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.userId}</td>
                    <td>${item.address}</td>
                    <td>${item.phone}</td>
                    <td>${products}</td>
                    <td>$${item.total}</td>
                </tr>
        `;
  });
  tbody.innerHTML = items;
}

function handleCreatProduct() {
  let createbtn = document.getElementById("addProduct");
  let item;
  createbtn.onclick = () => {
    let name = document.querySelector('input[id="pName-inp"]').value;
    let title = document
      .querySelector('input[id="title-inp"]')
      .value.toUpperCase();
    let price = document.querySelector('input[id="price-inp"]').value;
    let discountAmount = document.querySelector(
      'input[id="discountAmount-inp"]'
    ).value;
    let stock = document.querySelector('input[id="stock-inp"]').value;
    let description = document.querySelector(
      'input[id="description-inp"]'
    ).value;
    let brand = document.querySelector("#brand-inp").value;
    let category = document.querySelector("#category-inp").value;
    let url = document.querySelector("#img1-inp").value;
    let color = document.querySelector("#color1-inp").value;
    let sizeItem = [];
    let checkboxes = document.querySelectorAll(".size-inp");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) sizeItem.push(checkboxes[i].value);
    }
    if (!brand || !category || !color) {
      return;
    } else if (sizeItem.length == 0) {
      alert("Please choose sizes!");
    } else {
      item = {
        name: name,
        price: price,
        title: title,
        discountAmount: discountAmount,
        stock: stock,
        description: description,
        brand: brand,
        category: category,
        vote: "&#9733;&#9733;&#9733;&#9733;&#9733;",
        img: {
          url: url,
          color: color,
          url2: document.querySelector("#img2-inp").value,
          color2: document.querySelector("#color2-inp").value,
          url3: document.querySelector("#img3-inp").value,
          color3: document.querySelector("#color3-inp").value,
          url4: document.querySelector("#img4-inp").value,
          color4: document.querySelector("#color4-inp").value,
        },
        size: sizeItem,
        status: "Enabled",
      };
      document.querySelector("tbody").innerHTML += `
                <tr class="item-id-${productsData.length + 1}">
                    <td>${productsData.length + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.title}</td>
                    <td>${item.discountAmount}</td>
                    <td>${item.stock}</td>
                    <td>${item.stock}</td>
                    <td>${item.brand}</td>
                    <td><img src="${item.img.url}" alt="img" width="50px"></td>
                    <td>${item.status}</td>
                    <td>
                    <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#update${productsData.length + 1}" onclick="passDataProductsBeforeUpdate(${
        productsData.length + 1
      })">Update</button>
                    </td>
                </tr>
            `;
      createProduct(item);
      $("#add").modal("hide");
    }
  };
}

function handleCreatUser() {
  let createbtn = document.getElementById("addUser");
  let user;
  createbtn.onclick = () => {
    let userName = document.querySelector('input[id="uName-inp"]').value;
    let email = document.querySelector('input[id="email-inp"]').value;
    let address = document.querySelector('input[id="address-inp"]').value;
    let phone = document.querySelector('input[id="phone-inp"]').value;
    let roleRadio = document.querySelectorAll(`input[name="role-inp"]`);
    let role = "";
    if (!validateEmailAndTel(email, phone)) {
      alert("Please enter correctly email!");
      return;
    }
    if (roleRadio[0].checked == false && roleRadio[1].checked == false) {
      alert("Please choose role!");
    } else {
      if (roleRadio[0].checked == true) {
        role = roleRadio[0].value;
      } else {
        role = roleRadio[1].value;
      }
      user = {
        userName: userName,
        email: email,
        address: address,
        phone: phone,
        role: role,
        status: "Active",
        password: "123123",
      };
      createUser(user);
      $("#add").modal("hide");
    }
  };
}

function createProduct(data) {
  let option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(productApi, option).then((response) => response.json());
}

function passDataProductsBeforeUpdate(itemId) {
  let item = productsData.find((element) => element.id === itemId);
  document.querySelector(`input[id="pName-update-${itemId}"]`).value =
    item.name;
  document.querySelector(`input[id="price-update-${itemId}"]`).value =
    item.price;
  document.querySelector(`input[id="title-update-${itemId}"]`).value =
    item.title;
  document.querySelector(`input[id="discountAmount-update-${itemId}"]`).value =
    item.discountAmount;
  document.querySelector(`input[id="stock-update-${itemId}"]`).value =
    item.stock;
  document.querySelector(`input[id="description-update-${itemId}"]`).value =
    item.description;
  document.querySelector(`#category-update-${itemId}`).value = item.category;
  document.querySelector(`#brand-update-${itemId}`).value = item.brand;
  document.querySelector(`#img1-update-${itemId}`).value = item.img.url;
  document.querySelector(`#color1-update-${itemId}`).value = item.img.color;
  if (item.img.url2)
    document.querySelector(`#img2-update-${itemId}`).value = item.img.url2;
  if (item.img.color2)
    document.querySelector(`#color2-update-${itemId}`).value = item.img.color2;
  if (item.img.url2)
    document.querySelector(`#img3-update-${itemId}`).value = item.img.url3;
  if (item.img.color3)
    document.querySelector(`#color3-update-${itemId}`).value = item.img.color3;
  if (item.img.url3)
    document.querySelector(`#img4-update-${itemId}`).value = item.img.url4;
  if (item.img.color4)
    document.querySelector(`#color4-update-${itemId}`).value = item.img.color4;
  let size = document.querySelectorAll(`input[name="size-update-${itemId}"]`);
  let status = document.querySelectorAll(
    `input[name="status-update-${itemId}"]`
  );
  size.forEach((attribute) => {
    if (item.size.some((element) => element === attribute.value)) {
      attribute.checked = true;
    }
  });
  if (item.status === "Enabled") {
    status[0].checked = true;
  } else status[1].checked = true;
}

function passDataUsersBeforeUpdate(itemId) {
  let item = usersData.find((element) => element.id == itemId);
  document.querySelector(`input[id="uName-update-${itemId}"]`).value =
    item.userName;
  document.querySelector(`input[id="email-update-${itemId}"]`).value =
    item.email;
  document.querySelector(`input[id="phone-update-${itemId}"]`).value =
    item.phone;
  document.querySelector(`input[id="address-update-${itemId}"]`).value =
    item.address;
  let role = document.querySelectorAll(`input[name="role-update-${itemId}"]`);
  let status = document.querySelectorAll(
    `input[name="status-update-${itemId}"]`
  );
  if (item.role === "admin") {
    role[0].checked = true;
  } else role[1].checked = true;
  if (item.status === "Active") {
    status[0].checked = true;
  } else status[1].checked = true;
}

function checkAndHandleProductData(itemId) {
  let name = document.querySelector(`input[id="pName-update-${itemId}"]`).value;
  let price = document.querySelector(
    `input[id="price-update-${itemId}"]`
  ).value;
  let title = document
    .querySelector(`input[id="title-update-${itemId}"]`)
    .value.toUpperCase();
  let discountAmount = document.querySelector(
    `input[id="discountAmount-update-${itemId}"]`
  ).value;
  let stock = document.querySelector(
    `input[id="stock-update-${itemId}"]`
  ).value;
  let description = document.querySelector(
    `input[id="description-update-${itemId}"]`
  ).value;
  let brand = document.querySelector(`#brand-update-${itemId}`).value;
  let category = document.querySelector(`#category-update-${itemId}`).value;
  let url = document.querySelector(`#img1-update-${itemId}`).value;
  let color = document.querySelector(`#color1-update-${itemId}`).value;
  let statusRadio = document.querySelectorAll(
    `input[name="status-update-${itemId}"]`
  );
  let sizeItem = [];
  let status = "";
  let checkboxes = document.querySelectorAll(
    `input[name="size-update-${itemId}"]`
  );
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) sizeItem.push(checkboxes[i].value);
  }

  if (statusRadio[0].checked == true) {
    status = statusRadio[0].value;
  } else {
    status = statusRadio[1].value;
  }
  if (!brand || !category || !color) {
    return;
  } else if (sizeItem.length == 0) {
    alert("Please choose sizes!");
  } else {
    product = {
      name: name,
      price: price,
      title: title,
      discountAmount: discountAmount,
      stock: stock,
      description: description,
      brand: brand,
      category: category,
      vote: "&#9733;&#9733;&#9733;&#9733;&#9733;",
      status: status,
      img: {
        url: url,
        color: color,
        url2: document.querySelector(`#img2-update-${itemId}`).value,
        color2: document.querySelector(`#color2-update-${itemId}`).value,
        url3: document.querySelector(`#img3-update-${itemId}`).value,
        color3: document.querySelector(`#color3-update-${itemId}`).value,
        url4: document.querySelector(`#img4-update-${itemId}`).value,
        color4: document.querySelector(`#color4-update-${itemId}`).value,
      },
      size: sizeItem,
      id: itemId,
    };
    updateProduct(product);
    $(`#update${itemId}`).modal("hide");
  }
}

function checkAndHandleUserData(itemId) {
  let item = usersData.find((element) => element.id == itemId);
  let name = document.querySelector(`input[id="uName-update-${itemId}"]`).value;
  let email = document.querySelector(
    `input[id="email-update-${itemId}"]`
  ).value;
  let address = document.querySelector(
    `input[id="address-update-${itemId}"]`
  ).value;
  let phone = document.querySelector(
    `input[id="phone-update-${itemId}"]`
  ).value;
  let roleRadio = document.querySelectorAll(
    `input[name="role-update-${itemId}"]`
  );
  let statusRadio = document.querySelectorAll(
    `input[name="status-update-${itemId}"]`
  );
  let role = "";
  let status = "";
  if (roleRadio[0].checked == true) {
    role = roleRadio[0].value;
  } else {
    role = roleRadio[1].value;
  }
  if (statusRadio[0].checked == true) {
    status = statusRadio[0].value;
  } else {
    status = statusRadio[1].value;
  }
  if (!validateEmailAndTel(email, phone)) {
    return;
  } else {
    item.userName = name;
    item.email = email;
    item.address = address;
    item.phone = phone;
    item.role = role;
    item.status = status;
    updateUser(item);
    $(`#update${itemId}`).modal("hide");
  }
}

function updateProduct(data) {
  let option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(productApi + `/${data.id}`, option).then((response) => response.json());
}
