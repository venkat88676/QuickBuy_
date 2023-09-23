const basicURL = `https://dull-coveralls-fawn.cyclic.cloud`;

var category = "";
var rating = "";

var page = 1;
function get1() {
  page = 1;
  getData();
}
function get2() {
  page = 2;
  getData();
}
function get3() {
  page = 3;
  getData();
}
function get4() {
  page = 4;
  getData();
}
function get5() {
  page = 5;
  getData();
}
function getval() {
  // name=document.getElementById('name').value
  category = document.getElementById("byType").value;
  rating = document.getElementById("byRating").value;
  console.log(category, rating);
  getData();
}

let loader = document.getElementById("loader");
let proContainer = document.querySelector(".proContainer");

function getData() {
  const queryParam = new URLSearchParams(window.location.search);
  let search = queryParam.get("q") || "";

  loader.classList.remove("hide");
  proContainer.innerHTML = null;

  fetch(
    `${basicURL}/products?category=${category}&rating=${rating}&search=${search}&page=${page}`
  )
    .then((res) => res.json())
    .then((res) => {
      loader.classList.add("hide");
      console.log(res);
      res.forEach((element) => {

        let card = document.createElement("div");

        let img = document.createElement("img");
        img.src = element.image;

        let imgCard=document.createElement("div")
        imgCard.setAttribute("class","imgCard")
        imgCard.append(img)

        let name = document.createElement("p");
        name.innerText = element.name.split(" ").splice(0,5).join(" ");

         // sending product details to next page------->

        name.addEventListener("click",()=>{
          location.href=`./singleProduct.html?product=${JSON.stringify(element)}`
        })
        imgCard.addEventListener("click",()=>{
          location.href=`./singleProduct.html?product=${JSON.stringify(element)}`
        })

        let price = document.createElement("h2");
        price.innerHTML = `₹${element.price} `;
        price.style = "color:#0275dd";

        let rate = document.createElement("p");
        rate.innerHTML = `${element.rating} <ion-icon style="color:#ffd700" name="star"></ion-icon>`;

        let btn = document.createElement("button");
        btn.setAttribute("class", "addToCartBtn")
        btn.innerText = "Add To Cart";

        btn.addEventListener("click", () => {
          btn.innerHTML = `<i style="color:#fff" class="fa fa-refresh fa-spin"></i> Adding...`;

          addToCart(element);
        });

        card.append(imgCard, name, rate, price, btn);
        proContainer.append(card);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

getData();

function addToCart(element) {
  let addToCartBtn=document.querySelector(".addToCartBtn")
  
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please Login First");
    addToCartBtn.innerText = `Add to cart`;
    return;
  }

  fetch(`https://dull-coveralls-fawn.cyclic.cloud/cart/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(element),
  })
    .then((res) => res.json())
    .then((res) => {
      addToCartBtn.innerText = `Add to cart`;
      let msg = res.msg;
      if (msg.includes("duplicate key error collection")) {
        alert("Already in cart");
      } else alert(msg);
    })
    .catch((err) => {
      addToCartBtn.innerText = `Add to cart`;
      console.error(err);
      alert("Already in cart ");
    });
}
