
const BaseUrl_profile = `http://localhost:8800`


const userDetails = localStorage.getItem('userdetails') || null;
// console.log(qrcodeuserdetails_qrpage);
if (!userDetails) {
    alert('Kindly Login First');
    location.href = '../View/login.html'
}



setTimeout(() => {
    // showUsername_profile();
    populate();
}, 1000)



const userNameHeading = document.getElementById("login-user-name");

const userName = document.getElementById("login-user-name-input")
const userEmail = document.getElementById("login-user-email")
const userAddress = document.getElementById("login-user-address")
const userAge = document.getElementById("login-user-age")
const userGender = document.getElementById("login-user-gender")



function populate() {
    const details = JSON.parse(localStorage.getItem("userdetails")) || null
    // console.log(details)

    if (details) {
        userNameHeading.innerText = details.name

        userName.value = details.name;
        userEmail.value = details.email;
        userAddress.value = details.city;
        userAge.value = details.age;
        userGender.value = details.gender
    }
}



function forgotPasswordBtnProfile() {
    // console.log("update")
    location.href = "./forgetpass.html"
}


function updateProfile() {

    const payload = {
        Name: userName.value,
        Address: userAddress.value,
        Gender: userGender.value
    }

    const detailsforuserid = JSON.parse(localStorage.getItem("qrcodeuserdetails")) || null
    if (!detailsforuserid) {
        alert('Please Login Again.(Session Time Out)')
        return
    }

    if (!detailsforuserid._id) {
        alert('Please Login Again.(Session Time Out)')
        return
    }

    document.getElementById('user-profile-updateBtn').innerHTML = `<i class="fa fa-refresh fa-spin"></i> Update Profile`;
    document.getElementById('user-profile-updateBtn').disabled = true;



    if (confirm('Do You Want To Update Your Profile?')) {
        fetch(`${BaseUrl_profile}/profile/updateProfile/${detailsforuserid._id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                document.getElementById('user-profile-updateBtn').innerHTML = `Update Profile`;
                document.getElementById('user-profile-updateBtn').disabled = false;

                console.log(data);

                if (data?.user) {

                    localStorage.setItem('qrcodeuserdetails', JSON.stringify(data.user))

                }
                window.location.reload()
            }).catch(err => {
                console.error(err);

                document.getElementById('user-profile-updateBtn').innerHTML = `Update Profile`;
                document.getElementById('user-profile-updateBtn').disabled = false;

                alert('Something Went Wrong.(Please Try After Some Time)')
                location.reload()
            })
    } else {
        document.getElementById('user-profile-updateBtn').innerHTML = `Update Profile`;
        document.getElementById('user-profile-updateBtn').disabled = false;
        location.reload()
    }






}




function deleteProfile() {

    const detailsforuserid = JSON.parse(localStorage.getItem("qrcodeuserdetails")) || null
    if (!detailsforuserid) {
        alert('login first')
        return
    }

    if (!detailsforuserid._id) {
        alert('login first')
        return
    }

    document.getElementById('user-profile-deleteBtn').innerHTML = `<i class="fa fa-refresh fa-spin"></i> Delete My Account`;
    document.getElementById('user-profile-deleteBtn').disabled = true;


    if (confirm('Do You Want To Delete Your Account?')){
        fetch(`${BaseUrl_profile}/profile/deleteProfile/${detailsforuserid._id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {

                document.getElementById('user-profile-deleteBtn').innerHTML = `Delete My Account`;
                document.getElementById('user-profile-deleteBtn').disabled = false;

                console.log(data);

                if (data.success) {
    
                    localStorage.removeItem('qrcodeuserdetails');
    
                    location.href = '../index.html';
    
                } else {
                    alert(`You can't Able to Delete Account Yet. Please Contact To Manager`)
                }
    
            }).catch(err => {
                console.error(err);

                document.getElementById('user-profile-deleteBtn').innerHTML = `Delete My Account`;
                document.getElementById('user-profile-deleteBtn').disabled = false;

                alert('Something Went Wrong.(Please Try After Some Time)')
                location.reload()
            })
    }else{
        document.getElementById('user-profile-deleteBtn').innerHTML = `Delete My Account`;
        document.getElementById('user-profile-deleteBtn').disabled = false;
        location.reload()
    }

    

}
