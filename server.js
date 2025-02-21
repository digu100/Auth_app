//This will be the starting file of the project

const express=require("express")
const mongoose=require("mongoose")
const app=express()
const server_config=require("./configs/server.config")
const db_config=require("./configs/db.config")
const user_model=require("./models/user.model")
const bcryptjs=require("bcryptjs")

app.use(express.json())//middleware converting json to js
/*
Create an admin user at the starting of the application
if not already present
*/

//connection with mongodb
mongoose.connect(db_config.DB_URL)

const db=mongoose.connection
db.on("error",()=>{
    console.log("Error while connecting to mongodb")
})
db.once("open",()=>{
    console.log("connected to mongodb")
    init()//initialising my database
})

async function init(){

    try{
        let user= await user_model.findOne({userId:"admin"})

        if(user){
            console.log("Admin is already present")
            return
        }
    }catch(err){
        console.log("Error while reading the data", err)
    }

    

    try{
        user=await user_model.create({
            name:"Vishwa",
            userId:"admin",
            email:"kankvishw@gmail.com",
            userType:"ADMIN",
            password:bcryptjs.hashSync("welcome1",8)
        })
        console.log("Admin created",user)

    }catch(err){
        console.log("Error while create admin")
    }
}


/*
stitch the route to the server
*/
require("./routes/auth.routes")(app)//calling routes and passing app object
require("./routes/category.routes")(app)//stitching done

//Start the server
app.listen(server_config.PORT,()=>{
    console.log("Server started at port",server_config.PORT)
})









