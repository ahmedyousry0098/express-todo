import Joi from "joi";
import { CUSTOM_FIELDS } from "../../constants/customValidation";

export const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: CUSTOM_FIELDS.email.required(),
    password: CUSTOM_FIELDS.password.required()
})

export const loginSchema = Joi.object({
    email: CUSTOM_FIELDS.email.required(),
    password: CUSTOM_FIELDS.password.required()
})