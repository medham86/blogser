const User = require('../models/userModel');
const EventLogger = require("../services/logger.service")
const logger = EventLogger("auth")
const bcrypt = require("bcryptjs") ;
const jwt = require("jsonwebtoken")

const authController ={

newUser :  async(req,res)=>{

    try{
        const data = req.body ; 
        const user =await User.findOne({email : data.email})

        const errmess = "Email is already exsist"
        if(user){
          return res.status(400).send({message :errmess})
        }
     

        let newUser = new User(data);
        await newUser.save()
        res.status(200).send("account created")
    }catch(err){
        logger.error(err.message)
        res.status(500).send({message : err.message}) 
    }
},

login : async(req,res)=>{

    try{
        const data = req.body ; 
        const user =await User.findOne({email : data.email})

        if(!user){
          return res.status(400).send({message :"Invalid email or password"})
        }

      let validPassword =  await bcrypt.compare(req.body.password , user.password)

      if(!validPassword){
        return res.status(403).send({message :"Invalid email or password"})
      }

      let secretKey = process.env.SECRET_KEY
      let token = jwt.sign({id : user._id} , secretKey)
      
      res.cookie("access_token" ,`Bearer ${token}`,{
        httpOnly : true ,
        maxAge : 1000 *  60 * 60 * 24 * 2
      } )  

      

      user.tokens.push(token)
      user.save()
      res.send()
      

    }catch(err){
        logger.error(err.message)
        res.status(500).send(err.message)
    }
}

}

module.exports = authController