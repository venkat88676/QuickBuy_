

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
