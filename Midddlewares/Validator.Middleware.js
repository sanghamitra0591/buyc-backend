const jwt= require("jsonwebtoken")

require("dotenv").config();

const validator= (req, res, next)=>{
    const token= req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.privateKey, (err, decoded)=>{
            if(decoded){
                req.body.userId= decoded.userId;
                next();
            }else{
                res.send("Please login first");
            }
        })
    }else{
        res.send("Please login first");
    }
}

module.exports= {
    validator
}