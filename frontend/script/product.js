let category=""
  let rating=""
  let name=""
  let page=1
  function get1(){page=1
     getData()}
  function get2(){page=2
    getData()}
  function get3(){page=3
    getData()}
  function get4(){page=4
    getData()}
  function get5(){page=5
    getData()}
  function getval(){
    name=document.getElementById('name').value   
    category=document.getElementById("byType").value
    rating=document.getElementById("rating").value
    console.log(category,rating,name)
    getData()
  }

  
 
    
    function getData(){    
         
      fetch(`http://localhost:8800/products?category=${category}&rating=${rating}&name=${name}&page=${page}`).then(res=>res.json())
    .then(res=>{
      console.log(res)
      let proContainer=document.querySelector(".proContainer")
      proContainer.innerText=null
      for(let i=0;i<res.length;i++){
        let card=document.createElement('div')
        let img=document.createElement('img')
        img.src=res[i].image
        let name=document.createElement('h4')
        name.innerText=res[i].name
        let price=document.createElement('h4')
        price.innerText = `₹${res[i].price}/- ...Rating:- ${res[i].rating} ★★★★☆`;
        let btn = document.createElement("button");
        btn.innerText = 'Add To Cart'

        btn.addEventListener("click",()=>{
          console.log("cart")
          fetch("http://localhost:8800/cart/create",{
            method:"POST",
            headers:{
            "Content-type":"application/json",
            "Authorization":localStorage.getItem("token")
          },
          body: JSON.stringify(res[i])
          }).then(res=>res.json())
          .then(res=>{
            if(res.msg!=='added'){
              alert("Already in Cart")
            }
            else{
              alert("Product Added To Cart")
            }
            
            console.log(res.msg)
          })
          .catch(err=>{
            alert('Please Login First')
            console.log(err)})
        })       
        card.append(img,name,price,btn)
        proContainer.append(card)
      }      
    })
    .catch(err=>{
      console.log(err)})
    }

    getData()