function addList() {
    const task = document.getElementById('newList').value.trim();
    if (task.length > 0) {
        var user = JSON.parse(localStorage.getItem("user"));
        var userSessionStorage = JSON.parse(sessionStorage.getItem("user"));
        var details = JSON.stringify(user.users.find(element => element.username == userSessionStorage.username && element.password == userSessionStorage.password));
        var getUserDetails = JSON.parse(details);
        let add = {
            "taskname": task,
            "checked": "no"
        }
        getUserDetails.todolist.push(add);
        for (let list of user.users) {
            if (list.username == userSessionStorage.username && list.password == userSessionStorage.password) {
                list.todolist = getUserDetails.todolist;
                localStorage.setItem("user", JSON.stringify(user));
            }
        }
    } else {
        alert('Invalid task');
    }
    document.getElementById('newList').value = '';
    display();
}

function logout() {
    sessionStorage.clear();
    location.href = "signin.html";
}

function display() {
    var x = '';
    if (sessionStorage["user"] != undefined) {
        var currentUser = JSON.parse(sessionStorage["user"]);
        var user = JSON.parse(localStorage.getItem("user"));
        var getDetails = user.users.find(element => element.username == currentUser.username && element.password == currentUser.password);
        if (getDetails.todolist.length > 0) {
            for (i in getDetails.todolist) {
                x += "<p onclick = 'strike(this);' > " + getDetails.todolist[i].taskname + " </p>"
            }
        } else {
            x = "Enter task to add";
        }
    }
    document.getElementById('showList').innerHTML = x;
}
window.onload = display();

function strike(x) {
    x.classList.toggle('completed');

}

function empty() {
    var currentUser = JSON.parse(sessionStorage["user"]);
    var user = JSON.parse(localStorage.getItem("user"));
    var getDetails = user.users.find(element => element.username == currentUser.username && element.password == currentUser.password);
    for (i in getDetails.todolist) {
        console.log(getDetails.todolist.pop());
    }
    getDetails.todolist.pop();
    localStorage.setItem("user", JSON.stringify(user));
    display();
}