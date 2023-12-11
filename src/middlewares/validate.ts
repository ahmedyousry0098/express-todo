import { NextFunction, Request, Response } from 'express';
import joi, { ObjectSchema, ValidationResult } from 'joi';

export const validate = (schema: ObjectSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		let requestKeys = { ...req.body, ...req.params, ...req.query };
		const result: ValidationResult = schema.validate(requestKeys, {
			abortEarly: false,
		});
		let messages: string[] = [];
		if (result.error?.details) {
			for (let err of result.error.details) {
				messages.push(err.message);
			}
			return res
				.status(400)
				.json({ message: 'validation error', details: messages });
		}
		next();
	};
};