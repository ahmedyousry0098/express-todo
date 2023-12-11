import Joi, { CustomHelpers } from "joi";
import mongoose from "mongoose";

export const CUSTOM_FIELDS = {
    objectId: Joi.string().custom((value: string, helper: CustomHelpers<boolean>) => {
        return mongoose.Types.ObjectId.isValid(value) ? true : helper.message({custom: `${value} is In-valid ObjectId`})
    }),
    email: Joi.string().email().messages({
		'string.base': 'Email must be a string.',
		'string.email': 'Email must be a valid email address.',
		'any.required': 'Email is required.'
	}),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).messages({
		'string.pattern.base': 'Password must meet the criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.',
		'any.required': 'Password is required.'
	}),
}