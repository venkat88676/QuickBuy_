const BaseUrl_profile = `https://dull-coveralls-fawn.cyclic.cloud`;

const userDetails = localStorage.getItem("userdetails") || null;
// console.log(qrcodeuserdetails_qrpage);
if (!userDetails) {
  alert("Kindly Login First");
  location.href = "./signin.html";
}

setTimeout(() => {
  // showUsername_profile();
  populate();
}, 1000);

const userNameHeading = document.getElementById("login-user-name");
const userName = document.getElementById("login-user-name-input");
const userEmail = document.getElementById("login-user-email");
const userAddress = document.getElementById("login-user-address");
const userAge = document.getElementById("login-user-age");
const userGender = document.getElementById("login-user-gender");

function populate() {
  const details = JSON.parse(localStorage.getItem("userdetails")) || null;
  // console.log(details)

  if (details) {
    userNameHeading.innerText = details.name.split(" ")[0];

    userName.value = details.name;
    userEmail.value = details.email;
    userAddress.value = details.city;
    userAge.value = details.age;
    userGender.value = details.gender;
  }
}

function updateProfile() {
  const payload = {
    name: userName.value,
    city: userAddress.value,
    gender: userGender.value,
    age: userAge.value,
  };
  const detailsforuserid =
    JSON.parse(localStorage.getItem("userdetails")) || null;

  if (!detailsforuserid._id) {
    alert("Please Login Again.(Session Time Out)");
    return;
  }

  document.getElementById(
    "user-profile-updateBtn"
  ).innerHTML = `<i class="fa fa-refresh fa-spin"></i> Updating...`;
  document.getElementById("user-profile-updateBtn").disabled = true;

  if (confirm("Do You Want To Update Your Profile?")) {
    console.log(detailsforuserid)
    fetch(`${BaseUrl_profile}/users/update/${detailsforuserid._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById('user-profile-updateBtn').innerHTML = `Update Profile`;
        document.getElementById('user-profile-updateBtn').disabled = false;
        let user=data.user        
        localStorage.setItem('userdetails', JSON.stringify(user))        
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        document.getElementById(
          "user-profile-updateBtn"
        ).innerHTML = `Update Profile`;
        document.getElementById("user-profile-updateBtn").disabled = false;

        alert("Something Went Wrong.(Please Try After Some Time)");
        location.reload();
      });
  } else {
    document.getElementById(
      "user-profile-updateBtn"
    ).innerHTML = `Update Profile`;
    document.getElementById("user-profile-updateBtn").disabled = false;
    location.reload();
  }
}

function deleteProfile() {
  const detailsforuserid =
    JSON.parse(localStorage.getItem("userdetails")) || null;

  if (!detailsforuserid._id) {
    alert("login first");
    return;
  }

  document.getElementById(
    "user-profile-deleteBtn"
  ).innerHTML = `<i class="fa fa-refresh fa-spin"></i> Deleting ...`;
  document.getElementById("user-profile-deleteBtn").disabled = true;

  if (confirm("Do You Want To Delete Your Account?")) {
    fetch(`${BaseUrl_profile}/users/delete/${detailsforuserid._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById(
          "user-profile-deleteBtn"
        ).innerHTML = `Delete My Account`;
        document.getElementById("user-profile-deleteBtn").disabled = false;

        console.log(data);

        if (data.success) {
          localStorage.removeItem("userdetails");

          location.href = "./index.html";
        } 
      })
      .catch((err) => {
        console.error(err);

        document.getElementById(
          "user-profile-deleteBtn"
        ).innerHTML = `Delete My Account`;
        document.getElementById("user-profile-deleteBtn").disabled = false;

        alert("Something Went Wrong.(Please Try After Some Time)");
        location.reload();
      });
  } else {
    document.getElementById(
      "user-profile-deleteBtn"
    ).innerHTML = `Delete My Account`;
    document.getElementById("user-profile-deleteBtn").disabled = false;
    location.reload();
  }
}
