import Joi from "joi";

// "Joi" pattern for words

const wordStringSchema = Joi.string()
  .max(32)
  .min(2)
  .pattern(/[^A-Za-zÀ-ÿ\s-]+/, { invert: true });

export { wordStringSchema };
