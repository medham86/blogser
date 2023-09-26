const User = require('../models/userModel');
const EventLogger = require("../services/logger.service")
const logger = EventLogger("auth")
const bcrypt = require("bcryptjs") ;
const jwt = require("jsonwebtoken")

exports.authentication = async(req,res,next)=>{
    try{
        if(!req.cookies){
            res.status(401).send("unAuthorized user")
        }
        const token =await req?.cookies?.access_token?.split(" ")[1] ;

        let secretKey = process.env.SECRET_KEY ;
        let valid =  jwt.verify(token,secretKey) ;

        if(!valid){
            res.status(401).send("unAuthorized user 1")
        }
       

        const user = await User.findById(valid.id)

        if(!user){
            res.status(401).send("unAuthorized user 2")
        }
            
        if(!user.tokens.includes(token)){
            res.status(401).send("unAuthorized user 3")
        }
        delete user.token ;
        delete user.password ;

        req.user = user
        req.token = token
        next()
       
    }catch(err){
        logger.error(err.message)
        res.status(500).send({message : err.message})  
    }
}

exports.adminAuthorization = async(req,res,next)=>{
    try{
        this.authentication(req,res,()=>{

            if(!req.user.isAdmin){
                res.status(403).send("unAuthorized user 4")
            }else{

                next()
            }
        })
        
    }catch(err){
        logger.error(err.message)

        res.status(500).send({message : err.message}) 
    }
}



