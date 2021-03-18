const router = require("express").Router();
const verify = require("../verifyToken");
const User = require("../models/User");


router.get("/",verify,(req,res)=>{
    User.findById(req.userId)
    .then((result)=>{
        console.log(result)
        return res.json({notes:result.notes})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/",verify,(req,res)=>{
//   User.findOne({_id:req.body.id},(err,founduser)=>{
//       if(foundUser){

//       }
//   })
    User.updateOne({_id:req.userId},{notes:req.body.notes},function(err){
        if (err){
        console.log(err);
        }else{
           res.send(req.body.notes)
        }
      })
})

module.exports = router;