const router = require("express").Router();
const User = require("../models/User");
const dotenv = require("dotenv")
const {registerValidation,loginValidation} = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

dotenv.config()

const saltRounds = 10;

router.post('/register', async (req,res) => {
    //lets validate the data. The joi.validate thing send error as the 1st object in its response and there is also a message in the details.
    const {error} = registerValidation(req.body);
    if(error){
        return res.send(error.details[0].message)
    }else{
        //check if email already exists
        User.findOne({email:req.body.email},async (err,foundEmail)=> {
            if(foundEmail){
                res.send("Email already exists")
            }else{
                bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
                    //create a user
                    const user = new User({
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        email:req.body.email,
                        password:hash
                    });
                    try{
                        const savedUser = await user.save();
                        res.send(savedUser);
                
                    }catch(err){
                        res.status(400).send(err);
                    }
                });
                
                
    
            }
        

        })
        
    
    }
});

router.post('/signin', async (req,res) => {
    //lets validate the data. The joi.validate thing send error as the 1st object in its response and there is also a message in the details.
    const {error} = loginValidation(req.body);
    if(error){
        return res.send(error.details[0].message)
    }else{
        //check if email doesn't exist
        User.findOne({email:req.body.email},async (err,foundUser)=> {
            if(!foundUser){
                res.send("Email doesn't match our records")
            }else{
                //check password
                bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
                   if(result){
                       const token = jwt.sign({ _id:foundUser._id }, process.env.TOKEN_SECRET,{expiresIn:"1hr"});
                    //    res.cookie('auth', token, { httpOnly: true });
                       res.send(token)
                   }else{
                       res.send("invalid password")
                   }
                });
             }
        })
        
        
    
    }
});


module.exports = router;