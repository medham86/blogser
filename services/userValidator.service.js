const Joi = require("joi");

const newUserchema = Joi.object({
  fname: Joi.string().min(3).max(30).required(),
  lname: Joi.string().min(3).max(30).required(),

  password: Joi.string()
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(8)
    .required(),
  rePassword: Joi.string()
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(8)
    .required(),
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string()
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(8)
    .required(),

  email: Joi.string().required(),
});

module.exports = { newUserchema, loginSchema };
