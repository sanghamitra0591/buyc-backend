const mongoose= require("mongoose");

const OEM_SpecsSchema= mongoose.Schema({
    name: String,
    year: Number,
    listPrice: Number,
    color: [String],
    mileage: String,
    power: String,
    maxSpeed: String
})

const OEM_SpecsModel= mongoose.model("OEM_Specs", OEM_SpecsSchema);

module.exports= {
    OEM_SpecsModel
}