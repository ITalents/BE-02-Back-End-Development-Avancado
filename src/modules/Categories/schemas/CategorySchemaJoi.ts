import joi from "joi";

export const categorySchemmaJoi = joi.object({
  name: joi.string().min(2).required(),
  created_at: joi.date(),
});
