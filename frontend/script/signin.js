let BaseUrl=`http://localhost:8800`

let loginToggle = document.getElementById("loginToggle");
let signinToggle = document.getElementById("signinToggle");
let adminToggle = document.getElementById("adminToggle");
let signin = document.getElementById("signin");
let login = document.getElementById("login");
let admin = document.getElementById("admin");

loginToggle.addEventListener("click", () => {
    loginToggle.classList.add("active");
    signinToggle.classList.remove("active");
    adminToggle.classList.remove("active");
    login.classList.add("activate");
    signin.classList.remove("activate");
    admin.classList.remove("activate");
});

signinToggle.addEventListener("click", () => {
    loginToggle.classList.remove("active");
    signinToggle.classList.add("active");
    adminToggle.classList.remove("active");
    login.classList.remove("activate");
    signin.classList.add("activate");
    admin.classList.remove("activate");
});

adminToggle.addEventListener("click", () => {
    loginToggle.classList.remove("active");
    signinToggle.classList.remove("active");
    adminToggle.classList.add("active");
    login.classList.remove("activate");
    signin.classList.remove("activate");
    admin.classList.add("activate");
});


// -----------login part---------->

document.getElementById("login").addEventListener("submit",(e)=>{
    e.preventDefault();
    let payload = {
        email: document.getElementById("emailLog").value,
        password: document.getElementById("passLog").value,
      };
      console.log(payload);
      fetch(`${BaseUrl}/users/login`, {
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
})


// ---------------signin part--------------->

document.getElementById("signin").addEventListener("submit",(e)=>{
    console.log("register");
    e.preventDefault()
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let gender = document.getElementById("gender").value;
  let age = document.getElementById("age").value;
  let city = document.getElementById("city").value;
  let payload = { name, email, password, gender, age, city };
  fetch(`${BaseUrl}/users/register`, {
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
})

// ---------------admin login---------------->

document.getElementById("admin").addEventListener("submit",(e)=>{
    e.preventDefault();
    let payload = {
        email: document.getElementById("adminEmail").value,
        password: document.getElementById("adminPass").value,
      };
      fetch(`${BaseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          const inputOtp = prompt("Enter security key for Admin verification");
          console.log(typeof inputOtp);
          if (res.token && inputOtp === "1234") {
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
})




//-------------------google auth-----------------

let googleBtn = document.getElementById("oAuthlogo");

googleBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById(
    "googleBtn"
  ).innerHTML = `<i class="fa fa-refresh fa-spin"></i> Google`;
  window.location.href = `${BaseUrl}/users/auth/google`;
});



