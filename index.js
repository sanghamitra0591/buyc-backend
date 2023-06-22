const express= require("express");

const { connection } = require('./Configs/db');
const { validator } = require("./Midddlewares/Validator.middleware");
const { UserRouter } = require("./Routes/User.Route");
const { carDetailsRouter } = require("./Routes/carDetails.route");
const { OEM_SpecsRoute } = require("./Routes/OEM-specs.route");


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




app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Unable to connect DB");
    }
    console.log(`Running at port ${process.env.port}`);
})