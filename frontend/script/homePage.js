let signIn = document.querySelector(".signIn");
let container = document.querySelector(".container");
function activate() {
  container.classList.add("activate");
  signIn.classList.add("activate");
}
function remove() {
  container.classList.remove("activate");
  signIn.classList.remove("activate");
  registerBtn.classList.remove("activate");
}
let registerBtn = document.querySelector(".register");
function register() {
  registerBtn.classList.add("activate");
  signIn.classList.remove("activate");
}
function prev() {
  console.log("prev");
  signIn.classList.add("activate");
  registerBtn.classList.remove("activate");
}

function onRegister() {
  console.log("register");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let gender = document.getElementById("gender").value;
  let age = document.getElementById("age").value;
  let city = document.getElementById("city").value;
  let payload = { name, email, password, gender, age, city };
  fetch("http://localhost:8800/users/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert("Registered Successfully");
    })
    .catch((err) => {
      alert("Please Fill all the column");
      console.log(err);
    });
}

function onSignIn() {
  let payload = {
    email: document.getElementById("emailLog").value,
    password: document.getElementById("passLog").value,
  };
  console.log(payload);
  fetch("http://localhost:8800/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.token) {
        alert("Login Successful");
        window.location.href = "./index.html";
        localStorage.setItem("username", res.username);
        localStorage.setItem("token", res.token);
      } else {
        alert("Wrong Credential");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// -------------Admin login---------------

function adminSignin() {
  let payload = {
    email: document.getElementById("emailLog").value,
    password: document.getElementById("passLog").value,
  };
  fetch("http://localhost:8800/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      const inputOtp=prompt("Please enter OTP for Admin verification")
      console.log(typeof inputOtp)
      if (res.token && inputOtp==="1234") {
        alert("Login Successful As Admin");
        window.location.href = "./admin.html";
        localStorage.setItem("username", res.username);
        localStorage.setItem("token", res.token);
      } else {
        alert("Wrong Credential");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// login valiidation to print name----->

let checkInOutBtn = document.getElementById("checkInOutBtn");
let userDetails = document.getElementById("userDetails");
let usernameTag = document.getElementById("username");
let logoutBtn = document.getElementById("logoutBtn");

function checkLogin() {
  let username = localStorage.getItem("username");
  if (username) {
    checkInOutBtn.style.display = "none";
    userDetails.style.display = "block";
    logoutBtn.style.display = "block";
    usernameTag.innerText = username;
  } else {
    userDetails.style.display = "none";
    checkInOutBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
}
checkLogin();

//  logout function
function logoutFun() {
  let res=window.confirm("Do you want to logout?");
  if(res){
    alert("Logout Successfully");
  localStorage.clear();
  window.location.href = "./index.html";
  }
  
}
