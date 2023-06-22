const express= require("express");
const { CarDeatilsModel } = require("../Models/CarDetails.model");
const { Marketplace_Inventory_MOdel } = require("../Models/Marketplace_Inventory.model");

const carDetailsRouter=  express.Router();

carDetailsRouter.get("/", async(req, res)=>{
    try {
        const data= await CarDeatilsModel.find();
        res.send(data);
    } catch (error) {
        res.send({"msg": "Unable to get car data"});
        console.log(error);
    }
})

carDetailsRouter.post("/add", async(req, res)=>{
    const {image, title, description, kmsOnOdometer, majorScratches, originalPaint, noOfAccidents, noOfPreviousBuyers, registrationPlace, OEM_specs_id, dealer_id}= req.body;
    try {
        const newMarketplaceInventory= new Marketplace_Inventory_MOdel({kmsOnOdometer, majorScratches, originalPaint, noOfAccidents, noOfPreviousBuyers, registrationPlace});
        await newMarketplaceInventory.save();
        const newCarDetails= new CarDeatilsModel({image, title, description, OEM_specs_id, dealer_id, Marketplace_Inventory_id:newMarketplaceInventory._id});
        await newCarDetails.save();
        res.send({"msg": "Successfully added new car data"});
    } catch (error) {
        res.send({"msg": "Unable to add car data"});
        console.log(error);
    }
})

carDetailsRouter.patch("/edit/:id", async(req, res)=>{
    const id= req.params.id;
    const data= req.body;
    const dealer_id= req.body.userId;
    try {
        const isData= await CarDeatilsModel.find({"_id": id});
        if(isData.length===0){
            res.send({"msg": "Unable to find car data"});
        }else {
            if(dealer_id!==isData[0].dealer_id){
                res.send({"msg": "Not Authorized to change the car details"});
            }else{
                await CarDeatilsModel.findByIdAndUpdate({"_id": id}, data);
                res.send({"msg": "Successfully changed the car data"});
            }
        }
    } catch (error) {
        res.send({"msg": "Unable to edit car data"});
        console.log(error);
    }
})

carDetailsRouter.delete("/edit/:id", async(req, res)=>{
    const id= req.params.id;
    const dealer_id= req.body.userId;
    try {
        const isData= await CarDeatilsModel.find({"_id": id});
        if(isData.length===0){
            res.send({"msg": "Unable to find car data"});
        }else {
            if(dealer_id!==isData[0].dealer_id){
                res.send({"msg": "Not Authorized to delete the car details"});
            }else{
                await CarDeatilsModel.findByIdAndDelete({"_id": id});
                res.send({"msg": "Successfully deleted the car data"});
            }
        }
    } catch (error) {
        res.send({"msg": "Unable to delete car data"});
        console.log(error);
    }
})



module.exports= {
    carDetailsRouter
}