import joi from "joi";

export const cartSchemmaJoi = joi.object({
  products: joi.array().required(),
  total_price: joi.number().required(),
  freight: joi.number().required(),
  user_id: joi.string().required(),
  created_at: joi.date(),
});
