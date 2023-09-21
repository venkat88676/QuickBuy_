const basicURL = `http://localhost:8800`;

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
function getval(){
  // name=document.getElementById('name').value
  category=document.getElementById("byType").value
  rating=document.getElementById("byRating").value
  console.log(category,rating)
  getData()
}

let loader=document.getElementById("loader")
let proContainer = document.querySelector(".proContainer");

function getData() {
  const queryParam= new URLSearchParams(window.location.search)
  let search=queryParam.get("q") ||""
  
  loader.classList.remove("hide")
  proContainer.innerHTML=null

  fetch(
    `${basicURL}/products?category=${category}&rating=${rating}&search=${search}&page=${page}`
  )
    .then((res) => res.json())
    .then((res) => {
      loader.classList.add("hide")
      console.log(res)
      for (let i = 0; i < res.length; i++) {
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.src = res[i].image;
        let name = document.createElement("p");
        name.innerText = res[i].name;
        let price = document.createElement("h4");
        price.innerHTML = `₹${res[i].price} `;
        price.style="color:#0275dd"
        let rate = document.createElement("p")
        rate.innerHTML=`${res[i].rating} <ion-icon style="color:#ffd700" name="star"></ion-icon>`;
        let btn = document.createElement("button");
        btn.innerText = "Add To Cart";

        btn.addEventListener("click", () => {
          console.log("cart");
          fetch("http://localhost:8800/cart/create", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify(res[i]),
          })
            .then((res) => res.json())
            .then((res) => {
              let msg=res.msg;
              if(msg.includes("duplicate key error collection")){
                alert("Already in cart")
              }else
              alert(msg)
            })
            .catch((err) => {
              alert("Please Login First");
              console.log(err);
            });
        });
        card.append(img, name,rate, price, btn);
        proContainer.append(card);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

getData();
