const passport = require('passport');
const {UserModel}= require("../model/userModel")
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8800/users/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
        let email=profile._json.email
        console.log(email)
        const user=await UserModel.findOne({email})
        console.log(user)
  
        if(!user){
          console.log("adding new user")
          let newuser=new UserModel({
            name:profile._json.name,
            email,            
            password:"12345678",
            gender:"male",
            age:25,
            city:"Bhopal",
          })
          await newuser.save()
          return cb(null, newuser)
        }else{
          console.log("user is present db")
          return cb(null, user)
  
        }
      } catch (error) {
        console.log(error)
      }
  }
));

module.exports={passport}