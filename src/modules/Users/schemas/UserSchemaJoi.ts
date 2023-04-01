import joi from "joi";

export const userSchemmaJoi = joi
  .object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    image: joi.string().default(""),
    addresses: joi.array(),
    favorite_products: joi.array(),
    created_at: joi.date(),
    admin: joi.boolean(),
  })
  .meta({ className: "User" });
