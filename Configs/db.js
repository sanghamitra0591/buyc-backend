const mongoose= require("mongoose");

require("dotenv").config();

const connection= mongoose.connect("mongodb+srv://sanghamitra:sanghamitra@cluster0.cfmsy59.mongodb.net/attryb");

module.exports= {
    connection
}