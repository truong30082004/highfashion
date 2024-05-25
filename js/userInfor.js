passInf();
function passInf(){
    fetch(userApi)
    .then(res => res.json())
    .then(data => {
        let userId = window.localStorage.getItem('userId');
        let user = data.find(item => item.id == userId);
        document.querySelector(`input[id="name-mod"]`).value = user.userName;
        document.querySelector(`input[id="email-mod"]`).value = user.email;
        document.querySelector(`input[id="phone-mod"]`).value = user.phone;
        document.querySelector(`input[id="address-mod"]`).value = user.address;
        document.querySelector(`input[id="password-mod"]`).value = user.password;
    });
}

function updateUserInf(){
    let user = {
        userName: document.querySelector(`input[id="name-mod"]`).value,
        email: document.querySelector(`input[id="email-mod"]`).value,
        phone: document.querySelector(`input[id="phone-mod"]`).value,
        address: document.querySelector(`input[id="address-mod"]`).value,
        password: document.querySelector(`input[id="password-mod"]`).value,
        status: "Active",
        role: 'user',
        id: window.localStorage.getItem('userId')
    }
    updateUser(user);
}
function updateUser(data){
    let option ={
    method: 'PUT',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
    }
    fetch(userApi+`/${data.id}`,option)
    .then((response) => response.json())
}