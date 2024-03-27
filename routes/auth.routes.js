/*
POST localhost:8080/ecomm/api/v1/auth/signup
*/

const authController= require("../controllers/auth.controller")
const authMW=require("../middlewares/auth.mw")

module.exports=(app)=>{
    //POST localhost:8080/ecomm/api/v1/auth/signup
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignupBody],authController.signup)

    //POST localhost:8080/ecomm/api/v1/auth/signin
    app.post("/ecomm/api/v1/auth/signin",[authMW.verifySignInBody],authController.signin)

}




