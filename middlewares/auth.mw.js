//create a mw that checks that the request body is proper and correct
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const auth_config= require("../configs/auth.config")

const verifySignupBody=async (req,res,next)=>{
    try{
        //check all the parts of the entry
        if(!req.body.name){
            return res.status(400).send({
                message: "Failed: name not found"
            })
        }
        if(!req.body.email){
            return res.status(400).send({
                message: "Failed: email not found"
            })
        }
        if(!req.body.userId){
            return res.status(400).send({
                message: "Failed: userId not found"
            })
        }
        //check if the user with the same userId is already present
        const user=await user_model.findOne({userId: req.body.userId})
        if(user){
            return res.status(400).send({
                message: "Failed: user with same userId already present"
            })
        }

        next()

    }catch(err){
        console.log("Error while validating the request object",err)
        res.status(500).send({
            message: "Error while validating the request object"
        })
    }
}

const verifySignInBody=async (req,res,next)=>{

    if(!req.body.userId){
        return res.status(400).send({
            message: "userid not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message: "password not provided"
        })
    }

    next()
}

const verifyToken= (req,res,next)=>{
    //check if token is present in the header
    const token= req.headers['x-access-token']

    if(!token){
        return res.status(403).send({
            message:"No, token not found: unauthorized"
        })
    }

    //check if token is valid
    jwt.verify(token,auth_config.secret,async(err,decoded)=>{//call back func
        if(err){
            return res.status(401).send({
                message: "Unauthorized!"
            })
        }
        const user=await user_model.findOne({userId: decoded.id})

        if(!user){
            return res.status(400).send({
                message: "Unauthorized, this user for this token doesent exist"
            })
        }
        next()
    })

   
}


module.exports={
    verifySignupBody: verifySignupBody,
    verifySignInBody: verifySignInBody,
    verifyToken:verifyToken
}



