const basicURL = `https://dull-coveralls-fawn.cyclic.cloud`;


let smartPhoneContainer = document.getElementById("smartPhoneContainer");

function fetchData() {
    smartPhoneContainer.innerHTML=`  <img class="homeLoader" src="./images/loader3.gif" alt="">
    `
  fetch(`${basicURL}/products`)
    .then((res) => res.json())
    .then((res) => {
        smartPhoneContainer.innerHTML=null
      console.log(res);
      showSmartPhones(res);
    //   showLaptops(res);
      showTablets(res);
    //   showSmartTV(res);
      showHeadphones(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

fetchData();


function showSmartPhones(data) {
    let limit=1
  data.forEach((element) => {
    if(limit>6){
        return
    }
    if (element.category === "smartphone") {
      let card = document.createElement("div");
      let img = document.createElement("img");
      img.src = element.image;
      let name = document.createElement("p");
      name.innerText = element.name.split(",").slice(0,2);

      card.append(img, name);
      smartPhoneContainer.append(card);
      limit++
    }
   
  });
}

let laptopsContainer = document.getElementById("laptopsContainer");
function showLaptops(data) {
  data.forEach((element) => {
    if (element.category === "laptop") {
      let card = document.createElement("div");
      let img = document.createElement("img");
      img.src = element.image;
      let name = document.createElement("p");
      name.innerText = element.name.split(" ").slice(0,2);

      card.append(img, name);
      laptopsContainer.append(card);
    }
  });
}

let tabletsContainer = document.getElementById("tabletsContainer");
function showTablets(data) {
  data.forEach((element) => {
    if (element.category === "tablet") {
      let card = document.createElement("div");
      let img = document.createElement("img");
      img.src = element.image;
      let name = document.createElement("p");
      name.innerText = element.name.split(" ").slice(0,3);

      card.append(img, name);
      tabletsContainer.append(card);
    }
  });
}

let smartTvContainer = document.getElementById("smartTvContainer");
function showSmartTV(data) {
    console.log("tv")
   let limit =1
  data.forEach((element) => {
    console.log(limit)
    if(limit>6){
        return
    }
    if (element.category === "tv") {
      let card = document.createElement("div");
      let img = document.createElement("img");
      img.src = element.image;
      let name = document.createElement("p");
      name.innerText = element.name.split(" ").slice(0,3);

      card.append(img, name);
      smartTvContainer.append(card);
      limit++
    }
   
  });
}


let headphonesContainer = document.getElementById("headphonesContainer");
function showHeadphones(data) {
    console.log("headphone")
    let limit=1
  data.forEach((element) => {
    if(limit>6){
        return
    }
    if (element.category === "headphone") {
      let card = document.createElement("div");
      let img = document.createElement("img");
      img.setAttribute("class","headphoneImg")
      img.src = element.image;
      let name = document.createElement("p");
      name.innerText = element.name.split(" ").slice(0,3);

      card.append(img, name);
      headphonesContainer.append(card);
      limit++
    }
  
  });
}
// --------------Swiper slider logic------------

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },

  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
