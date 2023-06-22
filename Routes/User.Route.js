const { UserModel } = require("../models/User.Model");

require("dotenv").config();

const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

const express= require("express");

const UserRouter= express.Router();

UserRouter.get("/", async(req, res)=>{
    try {
        const data= await UserModel.find();
        res.send(data);
    } catch (error) {
        res.send({"error": error})
        console.log(error)
    }
})

UserRouter.get("/:id", async(req, res)=>{
    const id= req.params.id;
    try {
        const data= await UserModel.find({"_id": id});
        res.send(data);
    } catch (error) {
        res.send({"error": error})
        console.log(error)
    }
})

UserRouter.post("/signup", async(req, res)=>{
    let data= req.body;
    try {
        bcrypt.hash(data.password, +process.env.saltround, async(err, hash)=>{
            if(hash){
                const newData= new UserModel({...data, "password": hash});
                console.log({...data, password: hash});
                await newData.save();
                res.send({"msg": "Successfully signed up"})
            }else {
                res.send({"error": err})
                console.log(err)
            }
        })
    } catch (error) {
        res.send({"error": error})
        console.log(error)
    }
})


UserRouter.post("/login", async(req, res)=>{
    let data= req.body;
    try {
        const isUser= await UserModel.find({"email": data.email});
        if(isUser.length>0){
            bcrypt.compare(data.password, isUser[0].password, (err, result)=>{
                if(result){
                    const token = jwt.sign({userId:isUser[0]._id}, process.env.privateKey);
                    res.send({"msg": "Login Sucessful", "token" : token});
                }else{
                    res.send({"message": "Please enter correct password"});
                }
            })
        }else {
            res.send({"message": "User is not registered"});
        }
    } catch (error) {
        res.send({"error": error})
        console.log(error)
    }
})

UserRouter.patch("/edit", async(err, res)=>{
    const data= req.body;
    try {
        await UserModel.findByIdAndUpdate({"_id": data.userId}, data);
        res.send({"message": "Updated the changes"});
    } catch (error) {
        res.send({"error": error});
        console.log(error);
    }
})



module.exports= {
    UserRouter
}