//I need to wite the logic to register the user

const bcrypt= require("bcryptjs")
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const secret= require("../configs/auth.config")
exports.signup=async(req,res)=>{

    //logic to create the user

    //read the request body
    const request_body=req.body //in form of js object

    //insert the data in the users collection in mongodb
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password,8)

    }

    try{
        const user_created=await user_model.create(userObj)//soring in db
        //return that user
        const res_obj={
            name: user_created.name,
            userId: user_created.userId,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updateAt: user_created.updateAt
        }
        res.status(201).send(res_obj)

    }catch(err){
        console.log("error while registering user",err)
        res.status(500).send({
            message: "Some error while registering the user"
        })//internal server error
    }

    //return the response back to user

}


exports.signin=async(req,res)=>{

    //check if userId is present or not
    const user=await user_model.findOne({userId: req.body.userId})

    if(user==null){
        return res.status(400).send({
            message: "Userid not valid"
        })
    }

    //password is correct or not
    //compareSync 1st encrpts it then compare
    //returns true or false
    const isPasswordValid= bcrypt.compareSync(req.body.password, user.password)
    if(!isPasswordValid){
        return res.status(401).send({
            message: "Wrong password passed"
        })
    }


    //using jwt we will create the access token with a given TTL and return
    //On what data(pay load) you want to create the token + secret code
    const token=jwt.sign({id: user.userId},secret.secret,{
        expiresIn:120 //token expires in 2 mins
    })

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    })

}






