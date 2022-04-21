var user;
function storeCredentials() {
    let name = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmpassword").value.trim();
    if (name.length > 0 && password.length > 0 && password == confirmPassword) {
        if (localStorage['user'] == undefined) {
            user = {
                users: []
            }
            user.users.push({
                "username": name,
                "password": password,
                todolist: []
            });
            localStorage.setItem("user", JSON.stringify(user));
            document.signup.action = "signin.html";
        } else {
            user = JSON.parse(localStorage.getItem("user"));
            if (user.users.find(element => element.username == name && element.password == password)) {
                alert("User already exists.");
                document.signup.action = "signin.html";
            } else {
                user.users.push({
                    "username": name,
                    "password": password,
                    todolist: []
                });
                document.signup.action = "signin.html";
                localStorage.setItem("user", JSON.stringify(user));
            }
            console.log(JSON.parse(localStorage.getItem("user")));
        }
    } else {
        alert('Passwords mismatched');
    }
}
var findUser = '';

function checkCredentials() {
    let name = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    user = JSON.parse(localStorage.getItem("user"));
    var findUser = user.users.find(element => element.username == name && element.password == password);
    if (findUser) {
        document.signin.action = "tolist.html";
        user = {
            "username": name,
            "password": password
        }
        sessionStorage.setItem("user", JSON.stringify(user));
        alert('Welcome ' + name + ' to your ToDoList');
        display();
    } else {
        alert('Invalid username or password');
    }
}
