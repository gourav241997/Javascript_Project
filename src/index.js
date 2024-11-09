console.log("In Index")

const createUser= () => {
    const user1 = {
        username: 'user1',
        password: '123'
    }
    localStorage.setItem(
        'user1',
        JSON.stringify(user1)
    );
}

createUser();

let loginForm = document.getElementById('loginForm');

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let username = document.getElementById("username");
    let password = document.getElementById("password");

    let storedUser = JSON.parse(localStorage.getItem('user1'));

    if (username.value == storedUser.username && password.value == storedUser.password) {
        location.href = '../resume.html';
    } else {
        alert("Invalid credentials!!");
    }

})