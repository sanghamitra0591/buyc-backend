const express= require("express");

const { connection } = require('./Configs/db');
const { validator } = require("./Midddlewares/Validator.Middleware");
const { UserRouter } = require("./Routes/User.Route");
const { carDetailsRouter } = require("./Routes/carDetails.Route");
const { OEM_SpecsRoute } = require("./Routes/OEM-specs.Route");


const app= express();

const cors= require("cors");


app.use(cors({
    origin: "*"
}))

app.use(express.json());
require("dotenv").config();

app.get("/", (req, res)=>{
    res.send("Welcome to homepage");
})

app.use("/user", UserRouter);

app.use(validator);

app.use("/car", carDetailsRouter);

app.use("/oemspecs", OEM_SpecsRoute);




app.listen(8080, async()=>{
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Unable to connect DB");
    }
    console.log(`Running at port 8080`);
})