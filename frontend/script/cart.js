function getCart() {
    console.log("inside cart");
    fetch("http://localhost:8800/cart", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let proContainer = document.querySelector(".cartContainer");
        let tolItem = document.getElementById("tolItem");
        tolItem.innerText = `Total Item in Your Cart is ${res.length}`;
        if (res.length == 0) {
          let img = document.createElement("img");
          img.src =
            "https://i.pinimg.com/originals/5a/d0/47/5ad047a18772cf0488a908d98942f9bf.gif";
          img.style.width = "500px";
          proContainer.append(img);
        }
        let sum=0
        for (let i = 0; i < res.length; i++) {
          let card = document.createElement("div");
          let img = document.createElement("img");
          img.src = res[i].image;
          let name = document.createElement("h4");
          name.innerText = res[i].name;
          let price = document.createElement("h4");
          price.innerText = `₹${res[i].price}/- `;
          let cartIn = document.createElement("div");
          cartIn.classList.add("cartIn");
          let remove = document.createElement("button");
          remove.innerText = "Remove";
          let quantity = document.createElement("span");
          quantity.innerText = res[i].quantity;
          let inc = document.createElement("button");
          inc.innerText = "+";
          inc.addEventListener("click", () => {            
            res[i].quantity=res[i].quantity+1
            let payload={quantity:res[i].quantity}
            fetch(`http://localhost:8800/cart/update/${res[i]._id}`, {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
              body: JSON.stringify(payload)
            })
              .then((res) => res.json())
              .then((res) => {
                alert("Updated Successfully");
                location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          });


          let dec = document.createElement("button");
          dec.innerText = "-";

          dec.addEventListener("click", () => {
            res[i].quantity=res[i].quantity-1
            let payload={quantity:res[i].quantity}
            fetch(`http://localhost:8800/cart/update/${res[i]._id}`, {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
              body: JSON.stringify(payload)
            })
              .then((res) => res.json())
              .then((res) => {
                alert("Updated Successfully");
                location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
           
          });
         
          cartIn.append(dec, quantity, inc, remove);

          let text=document.createElement('h3')
          text.innerText=`Tol. Amt is :- ${res[i].price*res[i].quantity}`
          sum=sum+res[i].price*res[i].quantity
          let AmtDiv=document.getElementById('AmtDiv')
          AmtDiv.append(text)

          remove.addEventListener("click", () => {
            fetch(`http://localhost:8800/cart/delete/${res[i]._id}`, {
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
          });

          card.append(img, name, price, cartIn);
          proContainer.append(card);
        }
        let tol=document.getElementById('subTol')
        tol.innerText=sum
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCart();