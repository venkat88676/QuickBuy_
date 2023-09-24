const basicURL = `https://dull-coveralls-fawn.cyclic.cloud`;

// ----------Remove all cart items from cart list--------

let formCont = document.getElementById("checkout");
let submitCart = document.getElementById("submitCart")

formCont.addEventListener("submit", (e) => {
    submitCart.innerHTML=`<i style="color:#3592fc" class="fa fa-refresh fa-spin"></i> Please Wait..`
    submitCart.disabled =true
  e.preventDefault();
  let user = JSON.parse(localStorage.getItem("userdetails"));
  console.log(user._id);

  fetch(`${basicURL}/cart/deleteAll/${user._id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert("Order has been placed, It will reach within 1 week Thank You!");
      submitCart.innerHTML=`Place Order`
      location.href = "./index.html";
      // location.reload();
    })
    .catch((err) => {
      alert("Please Login First");
      window.location.reload(true);
      console.log(err);
    });
});
