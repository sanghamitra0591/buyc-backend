const express= require("express");

const app= express();

const cors= require("cors");

const { connection } = require("./Configs/db");
const { UserRouter } = require("./Routes/User.Route");
const { validator } = require("./Midddlewares/Validator.Middleware");

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


app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Unable to connect DB");
    }
    console.log(`Running at port ${process.env.port}`);
})