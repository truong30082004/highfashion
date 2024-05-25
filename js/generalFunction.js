const productApi = ' http://localhost:3000/products';
const userApi = ' http://localhost:3000/users';
const cartApi = ' http://localhost:3000/carts'
let usersData = [];
let productsData = [];
fetch(userApi)
    .then(res => res.json())
    .then(data => { 
        usersData = data; 
    });

fetch(cartApi)
    .then(res => res.json())
    .then(data => {
        showNumberOfItemInCart(data);
    })

const searchInput = document.getElementById('search-inp');

// Xử lý sự kiện khi nhấn nút tìm kiếm
function handleSearch() {
    localStorage.setItem('searching', searchInput.value);
    window.location.href = 'category.html';
}

function handleUserButton() {
    let isLogin = window.localStorage.getItem('userId');
    console.log(isLogin);
    if (isLogin) window.location.href = 'userInformation.html';
}

function checkLogIn() {
    let userEmail = document.querySelector('input[id="userEmail-inp"]').value;
    let password = document.querySelector('input[id="pword-inp"]').value;
    let user = usersData.find(item => item.email === userEmail);
    if (userEmail === "" || password === "") {
        return;
    } else if (user) {
        if (user.status === "Unactive") {
            alert("Your account is locked!")
        } else if (password === user.password) {
            window.localStorage.setItem('userId', user.id);
            notify('Logged in successfully!');
            if (user.role === "admin") {
                window.location.href = 'admin.html'
            } else $('#modal1').modal('hide');
        } else alert('Wrong password!');
    } else alert('User is not exist!')
}

function checkSignUp() {
    let user;
    let name = document.querySelector('input[id="name-reg"]').value;
    let email = document.querySelector('input[id="email-reg"]').value;
    let emailConfirm = document.querySelector('input[id="email-confirm"]').value;
    let password = document.querySelector('input[id="pword-reg"]').value;
    let passwordConfirm = document.querySelector('input[id="pword-confirm"]').value;
    let address = document.querySelector('input[id="address-reg"]').value;
    let phone = document.querySelector('input[id="phone-reg"]').value;

    if (usersData.find(item => item.email === email)) {
        alert('Email is exist!');
    } else if (email != emailConfirm) {
        alert('Email does not match!');
    } else if (password != passwordConfirm) {
        alert('Password does not match');
    } else {
        user = {
            userName: name,
            email: email,
            address: address,
            phone: phone,
            role: 'user',
            status: "Active",
            password: password
        }
        createUser(user);
        $('#modal2').modal('hide');
        window.localStorage.setItem('userId', usersData.length + 1);
    }
}

function showEmailModal() {
    document.querySelector('#modal3').innerHTML = `
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="modal2Label">Reset your password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="#" id="form">
            <div class="modal-body" id="resetPasswordForm">
                <div class="mb-3">
                <label for="email-conf" class="col-form-label">Your email:</label>
                <input type="email" name="email" class="form-control" id="email-conf" required>
                </div>
                <div class="mb-3 d-none" id="confirmCode">
                <label for="code-conf" class="col-form-label">code:</label>
                <input type="number" name="code" class="form-control" id="code-conf" required>
                </div>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" data-bs-toggle="modal"
                data-bs-target="#modal1">Log in</button>
                <button type="button" class="btn btn-info" data-bs-dismiss="modal" data-bs-toggle="modal"
                data-bs-target="#modal2">Sign up</button>
                <button type="submit" id="requestButton" class="btn btn-warning" onclick="handleSentEmail()">Request password reset</button>
            </div>
            </form>
        </div>
        </div>
    `;
}

function handleSentEmail(event) {
    let mail = document.querySelector('#email-conf').value;
    let user = usersData.find(e => e.email == mail);
    if (!user) {
        alert("Email is not register!");
    } else {
        user.code = Math.floor(Math.random() * 90000) + 10000;
        document.querySelector('input[name="code"]').value = user.code;
        updateUser(user);
        // event.preventDefault();
        sentEmail('template_p7xz2ul','form');
        document.querySelector('#resetPasswordForm').innerHTML = `
            <div class="mb-3">
                <label for="email-conf" class="col-form-label">Your email:</label>
                <input type="email" name="email" value="${user.email}" class="form-control" id="email-conf" disabled required>
            </div>
            <div class="mb-3" id="confirmCode">
                <label for="code-conf" class="col-form-label">code:</label>
                <input type="number" name="code" class="form-control" id="code-conf" required>
            </div>
            <button type="button" id="sentButton" class="btn btn-warning" onclick="checkResetPassword()">Enter</button>
        `;
    }
}

function sentEmail(templateId,formId) {
    const serviceID = 'service_qfi6joi';
    const templateID = templateId;
    emailjs.sendForm(serviceID, templateID, document.getElementById(formId))
        .then(() => {
            notify("Sent!");
        }, (err) => {
            notify(JSON.stringify(err));
            alert(JSON.stringify(err))
        });
}

function checkResetPassword() {
    fetch(userApi)
        .then(res => res.json())
        .then(data => {
            let email = document.querySelector('input[name="email"]').value;
            let user = data.find(e => e.email == email);
            if (user.code == document.querySelector('input[name="code"]').value) {
                document.querySelector('#resetPasswordForm').innerHTML = `
                    <div class="mb-3">
                        <label for="newPass" class="col-form-label">New password:</label>
                        <input type="password" class="form-control" id="newPass" required>
                    </div>
                    <div class="mb-3">
                        <label for="confPass" class="col-form-label">Confirm password:</label>
                        <input type="password" class="form-control" id="confPass" required>
                    </div>
                    <button type="button" id="changeButton" class="btn btn-warning">Change password</button>
                `;
                document.querySelector('#changeButton').addEventListener('click', function (event) {
                    event.preventDefault();
                    if (document.querySelector('#newPass').value == document.querySelector('#confPass').value) {
                        user.password = document.querySelector('#newPass').value;
                        notify('Changed password successfully!')
                        updateUser(user);
                        $('#modal3').modal('hide');
                    } else alert('Passwords do not match!')
                });
            } else {
                alert("The code is wrong!");
            }
        });
}

function validateEmailAndTel(email, phone) {
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var telPattern = /^0[0-9]{9,10}$/;
    if (!pattern.test(email)) {
        return false;
    } else if (!telPattern.test(phone)) {
        return false;
    } else return true
}

function logOut() {
    localStorage.removeItem('userId');
    window.location.href = 'index.html';
}
function createUser(data) {
    let option = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(userApi, option)
        .then((response) => response.json())
}

function showNumberOfItemInCart(carts) {
    let elements = $('.cart');
    if('userId' in localStorage) {
        let cart = carts.find(e => e.id == localStorage.getItem('userId'));
        let quantity = cart.productsCart.length;
        if(quantity) {
            changeNumberItem(quantity)
        }
    }
}

function changeNumberItem(number) {
    let elements = $('.cart');
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = number;
    }
}

function notify(content) {
    const message = document.getElementById('message');
    message.innerHTML = content;
    message.style.display = 'block';
    setTimeout(function () {
        message.style.opacity = 0;
        setTimeout(function () {
            message.style.display = 'none';
            message.style.opacity = 1;
        }, 2000);
    }, 2000);
}

function updateUser(data) {
    let option = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(userApi + `/${data.id}`, option)
        .then((response) => response.json())
}
