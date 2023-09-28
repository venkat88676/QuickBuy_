const urlParams = new URLSearchParams(window.location.search);
const productString = urlParams.get("product");

// Parse the productString back to an object
const product = JSON.parse(productString);

let productImage=document.getElementById("productImage")
let avatar=document.getElementById("avatar")
const nameProd=document.getElementById("nameProd")

let price=document.getElementById("priceProd")
let rating=document.getElementById("ratingProd")
let category=document.getElementById("categoryProd")


avatar.src=`${product.image}`;
nameProd.innerText=product.name
price.innerText=`₹ ${product.price}`
rating.innerHTML=`Rating ${product.rating} <ion-icon style="color:#ffd700" name="star"></ion-icon>`;
category.innerText=`Category  - ${product.category}`

productImage.append(avatar)

let addToprod=document.getElementById("addToprod")
addToprod.addEventListener("click",()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login First");
      addToprod.innerText = `Add to cart`;
      return;
    }
 
    addToprod.innerHTML= `<i style="color:#3592fc" class="fa fa-refresh fa-spin"></i> Adding...`;
    fetch(`https://dull-coveralls-fawn.cyclic.cloud/cart/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((res) => {
        addToprod.innerText = `Add to cart`;
        let msg = res.msg;
        if (msg.includes("duplicate key error collection")) {
          alert("Already in cart");
        } else alert(msg);
      })
      .catch((err) => {
        addToprod.innerText = `Add to cart`;
        console.error(err);
        alert("Already in cart ");
      });
})



