const basicUrl=`https://dull-coveralls-fawn.cyclic.cloud`

// let menu = document.querySelector(".menu");
// let left = document.querySelector(".left");
// let right = document.querySelector(".right");
// let table11=document.querySelector(".table11")
// menu.addEventListener("click", () => {
//   left.classList.toggle("active");
//   right.classList.toggle("active");
//   table11.classList.toggle("active");
// });

// const api = "http://localhost:8800/products";
fetchData();
function fetchData() {
  fetch(`${basicUrl}/products`)
    .then((req) => req.json())
    .then((data) => {
      console.log(data);
      display(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

let tproducts = document.querySelector(".tproducts");
let tolItm=document.getElementById("tolItm");
let tolAmt=document.getElementById("tolAmt")

function display(pdata) {
  tproducts.innerHTML = null;
  tolItm.innerText=pdata.length;
  pdata.forEach((element) => {
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerText = element.name;

    let td2 = document.createElement("td");
    td2.innerText = element.category;

    let td3 = document.createElement("td");
    td3.innerText = element.price;

    let td4 = document.createElement("td");
    let img = document.createElement("img");
    img.classList.add("image");
    img.src = element.image;
    td4.append(img);

    tr.append(td1, td2, td3, td4);
    tproducts.append(tr);
  });
}

// let userAPI="http://localhost:8800/users"
let tuser = document.querySelector(".tuser");


fetchUser();
function fetchUser() {
    fetch(`${basicUrl}/users`)
      .then((req) => req.json())
      .then((data) => {
        console.log(data);
        displayUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
    
  function displayUser(pdata) {
    pdata.forEach((element) => {
      let cart = document.createElement("div");
      cart.classList.add("users")
  
      let name = document.createElement("h4");
      name.innerText = element.name;  
      let email = document.createElement("p");
      email.innerText = element.email;
      let divdata=document.createElement("div")
      divdata.append(name,email)
  
     
      let img = document.createElement("img");
      img.classList.add("imgUser");
      img.src = "https://img.freepik.com/premium-vector/man-profile-cartoon_18591-58482.jpg?w=900";
      let divImg=document.createElement("div")
      divImg.append(img)
  
      cart.append(divImg,divdata);
      tuser.append(cart);
    });
  }
