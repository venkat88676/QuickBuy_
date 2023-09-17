let signIn = document.querySelector(".signIn");
  let container = document.querySelector(".container");
  function activate() {
    container.classList.add("activate");
    signIn.classList.add("activate");
  }
  function remove() {
    container.classList.remove("activate");
    signIn.classList.remove("activate");
    registerBtn.classList.remove("activate");
  }
  let registerBtn=document.querySelector('.register')
  function register(){
    registerBtn.classList.add('activate')
    signIn.classList.remove("activate");
  }
  function prev(){
    console.log("prev")
    signIn.classList.add("activate");
    registerBtn.classList.remove("activate");
  }

  function onRegister(){
    console.log("register")
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let gender=document.getElementById('gender').value;
    let age=document.getElementById('age').value;
    let city=document.getElementById('city').value;
    let payload={name,email,password,gender,age,city}
    fetch("https://vast-plum-moth-gown.cyclic.app/users/register",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>{
      console.log(res)
      alert("Registered Successfully")
    })
    .catch(err=>{
      alert("Please Fill all the column")
      console.log(err)})
  }

  function onSignIn(){
    let payload={
        email:document.getElementById("emailLog").value,
        password:document.getElementById("passLog").value
    }
    console.log(payload)
    fetch("https://vast-plum-moth-gown.cyclic.app/users/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>{
        if(res.token){
          alert("Login Successful")
        localStorage.setItem("token",res.token)
        }
        else{
          alert("Wrong Credential")
        }
    })
    .catch(err=>{
      
      console.log(err)})
  }