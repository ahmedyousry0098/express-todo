import Joi from "joi";
import { status } from "../../constants/statusOptions";
import { CUSTOM_FIELDS } from "../../constants/customValidation";


export const addTodoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(5),
    status: Joi.string().valid(...Object.values(status)),
    deadline: Joi.date().min(new Date().toLocaleDateString()).messages({
		'date.base': 'Start Date must be a valid date.',
		'date.min': 'Start Date must be later than or equal to today.'
	}),
    assignedTo: CUSTOM_FIELDS.objectId.required()
}).required()

export const updateTodoSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string().min(5),
    status: Joi.string().valid(...Object.values(status)),
    deadline: Joi.date().min(new Date().toLocaleDateString()).messages({
		'date.base': 'Start Date must be a valid date.',
		'date.min': 'Start Date must be later than or equal to today.'
	}),
    assignedTo: CUSTOM_FIELDS.objectId,
    todoId: CUSTOM_FIELDS.objectId.required()
}).required()

export const deleteTodoSchema = Joi.object({
    todoId: CUSTOM_FIELDS.objectId.required()
}).required()

export const getTodoSchema = Joi.object({
    todoId: CUSTOM_FIELDS.objectId.required()
}).required()