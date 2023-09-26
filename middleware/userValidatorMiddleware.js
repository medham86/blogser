const {newUserchema , loginSchema} = require("../services/userValidator.service")
const EventLogger = require("../services/logger.service")
const logger = EventLogger("auth")

function newUserValidator(req,res,next){
try{
    let {error} = newUserchema.validate(req.body)
    if(error){
        let errmessage = error.details[0].message
        logger.warn(errmessage)
        return res.status(403).send({message : errmessage})
    }

    next()  

    
}catch(err){
  return  res.status(500).send(err.message)
}
}

function loginValidator(req,res,next){
    try{
        let {error} = loginSchema.validate(req.body)
        if(error){
            let errmessage = error.details[0].message
            logger.warn(errmessage)
            return res.status(403).send({message : errmessage})
        }
        next()  
    }catch(err){
      return  res.status(500).send(err.message)
    }
    }

module.exports = {
    newUserValidator,
    loginValidator
}