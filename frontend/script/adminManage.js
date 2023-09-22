
const basicURL=`https://dull-coveralls-fawn.cyclic.cloud`

let menu = document.querySelector(".menu");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let table1=document.querySelector(".table1")
menu.addEventListener("click", () => {
  left.classList.toggle("active");
  right.classList.toggle("active");
  table1.classList.toggle("active");

});

fetchData();
function fetchData() {
  fetch(`${basicURL}/products`)
    .then((req) => req.json())
    .then((data) => {
      // console.log("data is this",data);
      display(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

let tproducts = document.querySelector(".tproducts");

function display(pdata) {
  tproducts.innerHTML = null;
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

    let td5 = document.createElement("td");
    let del = document.createElement("button");
    del.innerText = "Delete";
    del.classList.add("delete");
    del.addEventListener("click", () => {
      delProd(element._id);
    });

    let edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.classList.add("edit");

    // Define the edit event listener outside the loop
    edit.addEventListener("click", () => {
      handleEditClick(element);
    });

    td5.append(del, edit);
    tr.append(td1, td2, td3, td4, td5);
    tproducts.append(tr);
  });
}

// Define a separate function to handle the edit button click
function handleEditClick(element) {
  console.log(element);
  titleIn.value = element.name;
  categoryIn.value = element.category;
  urlIn.value = element.image;
  priceIn.value = element.price;
  let updatebtn = document.getElementById("update");
  updatebtn.addEventListener("click", (e) => {
    e.preventDefault();
    updateProd(element._id, titleIn.value, categoryIn.value, priceIn.value, urlIn.value);
  });
}

//---------------update Products------------->

function updateProd(id,name,category,price,url){
  console.log("id",id)
fetch(`${basicURL}/products/${id}`,{
  method:'PATCH',
  body:JSON.stringify({
    name:name,
    price:price,
    image:url,
    category:category
  }),
  headers:{
    'Content-type':'application/json'
  }
})
.then((req)=>req.json())
.then(()=>{
  fetchData();
  console.log("updated")
  alert("Updated Successfully")
})
}

// input taking part---->
let titleIn=document.getElementById("title");
let categoryIn=document.getElementById("category");
let priceIn=document.getElementById("price");
let urlIn=document.getElementById("url");

let addBtn=document.getElementById("new")
addBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  let title=titleIn.value;
  let category=categoryIn.value;
  let price=priceIn.value;
  let url=urlIn.value;
  addProd(title,category,price,url)
})



//Add function------------->

function addProd(title,category,price,url){
   
    fetch((`${basicURL}/products`),{
      method:'POST',
      body:JSON.stringify({
        title:title,
        description:category,
        price:price,
        avatar:url
      }),
      headers:{
        'Content-type':'application/json'
      }
    })
    .then((req)=>req.json())
    .then(()=>{
      fetchData();   
      console.log("new")
      alert("Product Added Successfully")
    })  
}
// Delete function-------------->
function delProd(id){
    console.log(id)
  fetch(`${basicURL}/products/${id}`,{
    method:'DELETE',
    headers:{
      'Content-type':'application/json'
    }
  })
  .then((req)=>req.json())
  .then(()=>{
    alert("Delete Successfully")
    fetchData();
  })
}

// // Pagination code --------------->

window.addEventListener("load",()=>{
  
})
