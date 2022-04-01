function storeCredentials(){
    let name = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmpassword").value;
    if(password === confirmPassword){
        var details = {
            "name": name,
            "password": password
        }
        localStorage.setItem("details", JSON.stringify(details));
        document.signup.action="signin.html";
    }
    else{
        alert("Password and Confirm Password are mismatched.");
        err();
        console.log('wrong');
    }
}

function checkCredentials(){
    let name = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    var details = JSON.parse(localStorage.getItem("details"));
     if(!details)
     {
         alert("Signup and try.");
     }
    if(name == details.name && password == details.password){
        document.signin.action="tolist.html";
    }
    else{
        alert("Invalid Name or Password!");
    }
}

var myList = document.getElementById("myList");
function addList(){
    var text = document.getElementById("newList").value.trim();
    if(text.length==0){
        alert('Please enter task name');
    }
    else{
        document.getElementById("newList").value = "";
        var p = document.createElement("p");
        p.innerHTML=text;
        p.className = "l";
        p.addEventListener('click', function(){
        p.classList.toggle('completed');
        })
        myList.appendChild(p);
        }
}
   

function empty(){
    var elements = document.querySelectorAll(".l");
    for(var x of elements){
        x.remove();
    }
}

function clearComplete(){
    var elements = document.querySelectorAll(".completed");
    for(var x of elements){
        x.remove();
    }
}

function save(){
    var saveList = document.getElementById("myList").innerHTML;
    localStorage.setItem("saveList", JSON.stringify(saveList));
}

function showSavedList(){
    var savedList = localStorage.getItem("saveList");
    document.getElementById("myList").innerHTML = JSON.parse(savedList);
}