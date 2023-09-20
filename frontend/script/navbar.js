
let BaseUrl=`http://localhost:8800`

// get userId from url given by google auth--->

let params = new URLSearchParams(window.location.search);
let userId=params.get('userid');

if(userId){
    fetch(`${BaseUrl}/users/getdata/?_id=${userId}`)
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
      console.log(data.userdetails)
        localStorage.setItem("userdetails",JSON.stringify(data.userdetails))
        
    })
    .catch((err)=>{
        console.log(err)
    })
}

// search function---->
let searchTimer
function searchItem(search){
  console.log(search)
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    window.location.href = `products.html?q=${search}`;
  }, 1000);
 
}

let searchInput=document.getElementById("searchInput")
searchInput.value=localStorage.getItem("searchItem")||""
searchInput.addEventListener("input",()=>{
  let query=searchInput.value
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    window.location.href = `products.html?q=${query}`;
    localStorage.setItem("searchItem",query)
  }, 1000);
})


// login valiidation to print name----->

let checkInOutBtn = document.getElementById("checkInOutBtn");
let userDetails = document.getElementById("userDetails");
let usernameTag = document.getElementById("username");
let logoutBtn = document.getElementById("logoutBtn");

function checkLogin() {
  let userdetails = JSON.parse(localStorage.getItem("userdetails")); 
  
  if (userdetails) {
    checkInOutBtn.style.display = "none";
    userDetails.style.display = "block";
    logoutBtn.style.display = "block";
    usernameTag.innerText = userdetails.name.split(" ")[0];
  } else {
    userDetails.style.display = "none";
    checkInOutBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
}
setTimeout(checkLogin(),2000) ;

//  logout function
function logoutFun() {
  let res=window.confirm("Do you want to logout?");
  if(res){
    // alert("Logout Successfully");
  localStorage.clear();
  window.location.href = "./index.html";
  }
  
}
