
let BaseUrl=`http://localhost:8800`

let params = new URLSearchParams(window.location.search);
    console.log("params",params)
let userId=params.get('userid');

console.log("userid",userId)

let obj={
    _id:userId
}

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
