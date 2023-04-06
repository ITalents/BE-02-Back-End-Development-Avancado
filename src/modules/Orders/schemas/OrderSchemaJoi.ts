import joi from "joi";

export const orderSchemmaJoi = joi.object({
  products: joi.array().required(),
  total_price: joi.number().required(),
  freight: joi.number().required(),
  user_id: joi.string(),
  concluded: joi.boolean().default(false),
  created_at: joi.date(),
});
