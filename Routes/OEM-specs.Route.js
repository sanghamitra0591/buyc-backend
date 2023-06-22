const express= require("express");
const { OEM_SpecsModel } = require("../models/OEM-specs.model");

const OEM_SpecsRoute= express.Router();

OEM_SpecsRoute.get("/", async(req, res)=>{
    let search= req.query.search;
    try {
        let data;
        if(search){
            data= await OEM_SpecsModel.find({"name" : {"$regex" : search, "$options" : "i"}});
        }else {
            data= await OEM_SpecsModel.find();
        }
        res.send(data);
    } catch (error) {
        res.send({"msg": "Something get wrong"});
        console.log(error);
    }
})




module.exports= {
    OEM_SpecsRoute
}