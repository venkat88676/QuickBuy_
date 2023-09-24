
const basicURL = `https://dull-coveralls-fawn.cyclic.cloud`;

let proContainer = document.querySelector(".cartContainer");


function showCartDetails() { 
  proContainer.innerHTML=`<img style="margin-left:200px" src="./images/loader3.gif" alt="">` || ""
  fetch(`${basicURL}/cart`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      proContainer.innerHTML=null
      console.log(data);
      displayData(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

document.addEventListener('DOMContentLoaded', showCartDetails);
// showCartDetails();


function displayData(res) {

  // store no of items in localstoage

  if(res.length!=0) localStorage.setItem("noOfItemInCart",res.length)

  // check empty cart----------->

  if (res.length === 0) {
    let img = document.createElement("img");
    img.src =
      "https://i.pinimg.com/originals/5a/d0/47/5ad047a18772cf0488a908d98942f9bf.gif";
    img.style.width = "500px";
    return proContainer.append(img);
  }
 
  let tolItem = document.getElementById("tolItem");
  tolItem.innerText = `Total Item in Your Cart is ${res.length}`;
  let sum = 0;

  res.map((elem) => {
    let card = document.createElement("div");
    let img = document.createElement("img");
    img.src = elem.image;
    let name = document.createElement("p");
    name.innerText = elem.name;
    let price = document.createElement("h4");
    price.innerText = `₹${elem.price}/- `;
    
    let cartIn = document.createElement("div");
    cartIn.classList.add("cartIn");
    let remove = document.createElement("button");
    remove.innerText = "Remove";
    let quantity = document.createElement("span");
    quantity.innerText = elem.quantity;

    let inc = document.createElement("button");
    inc.innerText = "+";
    inc.addEventListener("click", () => {
      elem.quantity = elem.quantity + 1;
      let payload = { quantity: elem.quantity };
      updateQuantity(elem,payload);
    });

    let dec = document.createElement("button");
    dec.innerText = "-";
    dec.addEventListener("click", () => {
      if(elem.quantity>1){
        elem.quantity = elem.quantity - 1;
        let payload = { quantity: elem.quantity };
        updateQuantity(elem, payload);
      }else{
        dec.disabled=true;
      }
      
    });

    cartIn.append(dec, quantity, inc, remove);

    let text = document.createElement("h3");
    text.innerText = `${elem.price * elem.quantity}`;
    sum = sum + elem.price * elem.quantity;
    let AmtDiv = document.getElementById("AmtDiv");
    AmtDiv.append(text);

    remove.addEventListener("click", () => {
      removeItem(elem);
    });

    card.append(img, name, price, cartIn);
    proContainer.append(card);
  });

  let tol = document.getElementById("subTol");
  tol.innerText = sum;
}

function updateQuantity(elem, payload) {
  fetch(`${basicURL}/cart/update/${elem._id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      alert("Updated Successfully");
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeItem(elem) {
  fetch(`${basicURL}/cart/delete/${elem._id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      alert("Delete Successfully");
      location.reload();
    })
    .catch((err) => {
      alert("Please Login First");
      window.location.reload(true);
      console.log(err);
    });
}




