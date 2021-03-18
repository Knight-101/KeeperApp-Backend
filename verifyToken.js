const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")



module.exports = function(req,res,next){
    const token = req.header("Authorization")
    // const token = req.cookies.token
    // console.log(req.body)

    if(!token){
        res.send([false,]);
    }else{
        try{
            const verified = jwt.verify(token,process.env.TOKEN_SECRET)
            req.userId= verified._id
           
            // res.send([true,verified._id,verified.notes]);

            next();
        }catch(err){
            res.send("invalid token")

        }
        
    }
}