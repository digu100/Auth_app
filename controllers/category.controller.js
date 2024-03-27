
const category_model=require("../models/category.model")
/*
Controller for creating the category

POST localhost:8080/ecomm/api/v1/categories

{
    "name": "Household",
    "description": "This will have all the household items"
}

*/

exports.createNewCategory=async (req,res)=>{

    //read the request body

    //create the category object
    const cat_data={
        name: req.body.name,
        description: req.body.description
    }

    try{
        //insert into mongodb
        const category=await category_model.create(cat_data)
        return res.status(201).send(category)

    }catch(err){
        console.log("error while creating the category",err)
        return res.status(500).send({
            message: "error while category creation"
        })
    }
   

    //return the response of the created category

}





