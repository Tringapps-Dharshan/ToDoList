function addList() {
    const task = document.getElementById('newList').value.trim();
    if (task.length > 0) {
        var user = JSON.parse(localStorage.getItem("user"));
        var userSessionStorage = JSON.parse(sessionStorage.getItem("user"));
        var details = JSON.stringify(user.users.find(element => element.username == userSessionStorage.username && element.password == userSessionStorage.password));
        var getUserDetails = JSON.parse(details);
        let add = {
            "taskname": task,
            "checked": "false"
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
               if(getDetails.todolist[i].checked=='true'){
                x += `<p class="completed" onclick = "strike(this,${i})" >${getDetails.todolist[i].taskname}</p>`
               }
               else{
                x += `<p onclick = "strike(this,${i})" >${getDetails.todolist[i].taskname}</p>`
               }
            }
        } else {
            x = "Enter task to add";
        }
    }
    document.getElementById('showList').innerHTML = x;
}

function strike(x,i) {
    var currentUser = JSON.parse(sessionStorage["user"]);
    var user = JSON.parse(localStorage.getItem("user"));
    var getDetails = user.users.find(element => element.username == currentUser.username && element.password == currentUser.password);
    if(getDetails.todolist[i].checked=='false'){
        getDetails.todolist[i].checked='true';
        x.classList.toggle('completed');
        localStorage.setItem("user",JSON.stringify(user));
    }else{
        getDetails.todolist[i].checked='false';
        x.classList.remove('completed');
        localStorage.setItem("user",JSON.stringify(user));
    }
}

function clearComplete(){
    var currentUser = JSON.parse(sessionStorage["user"]);
    var user = JSON.parse(localStorage.getItem("user"));
    var getDetails = user.users.find(element => element.username == currentUser.username && element.password == currentUser.password);
    var filtertask = getDetails.todolist.filter(check=>check.checked=="false");
    getDetails.todolist=filtertask;
    localStorage.setItem("user",JSON.stringify(user));
    display();
}

function empty() {
    var currentUser = JSON.parse(sessionStorage["user"]);
    var user = JSON.parse(localStorage.getItem("user"));
    var getDetails = user.users.find(element => element.username == currentUser.username && element.password == currentUser.password);
    if(getDetails.todolist.length>0){
        for (i in getDetails.todolist) {
            getDetails.todolist.pop();
        }
        getDetails.todolist.pop();
    }else{
        alert("No tasks to delete.");
    }
    localStorage.setItem("user", JSON.stringify(user));
    display();
}
