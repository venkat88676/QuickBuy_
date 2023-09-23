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


