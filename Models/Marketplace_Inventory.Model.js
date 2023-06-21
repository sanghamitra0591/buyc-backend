const mongoose= require("mongoose");

const Marketplace_Inventory_Schema= mongoose.Schema({
    kmsOnOdometer: String,
    majorScratches: String,
    originalPaint: String,
    noOfAccidents: Number,
    noOfPreviousBuyers: Number,
    registrationPlace: String
})

const Marketplace_Inventory_MOdel= mongoose.model("Marketplace_Inventory", Marketplace_Inventory_Schema);

module.exports= {
    Marketplace_Inventory_MOdel
}