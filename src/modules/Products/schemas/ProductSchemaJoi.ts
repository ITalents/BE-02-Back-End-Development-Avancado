import joi from "joi";

export const productSchemmaJoi = joi.object({
  name: joi.string().min(2).required(),
  description: joi.string().required(),
  unit_price: joi.number().required(),
  image: joi.string().default(""),
  bar_code: joi.number().required(),
  categories: joi.array(),
  created_at: joi.date(),
});
