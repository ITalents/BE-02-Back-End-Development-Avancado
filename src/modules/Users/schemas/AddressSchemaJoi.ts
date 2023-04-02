import joi from "joi";

export const addressSchemmaJoi = joi.object({
  street: joi.string().min(2).required(),
  number: joi.string().required(),
  complement: joi.string(),
  zipcode: joi.string().required(),
  created_at: joi.date(),
});
