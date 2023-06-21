const mongoose= require("mongoose");

const carDetailsSchema= mongoose.Schema({
    image: String,
    title: String,
    description: String,
    dealer_id: String,
    OEM_specs_id: String,
    Marketplace_Inventory_id: String
})

const CarDeatilsModel= mongoose. connect("cardetail", carDetailsSchema);

module.exports= {
    CarDeatilsModel
}