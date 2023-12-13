import Joi from "joi";
import { wordStringSchema } from "./wordString.js";

// "Joi" pattern for lists using the pattern of words in the list

const listSchema = Joi.array().max(20).min(1).items({
  word: wordStringSchema,
});

export { listSchema };
