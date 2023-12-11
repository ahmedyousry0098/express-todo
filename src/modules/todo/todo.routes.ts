import {Router} from 'express'
import { asyncHandler } from '../../utils/errHandling'
import { addTodo, deleteTodo, getTodo, updateTodo } from './todo.controller'
import { validate } from '../../middlewares/validate'
import { addTodoSchema, deleteTodoSchema, getTodoSchema, updateTodoSchema } from './todo.validation'
import { isAuth } from '../../middlewares/auth'

export const todoRouter = Router()

todoRouter.post(
    '/add',
    validate(addTodoSchema),
    isAuth,
    asyncHandler(addTodo)
)

todoRouter.patch(
    `/:todoId`,
    validate(updateTodoSchema),
    isAuth,
    asyncHandler(updateTodo)
)

todoRouter.delete(
    `/:todoId`,
    validate(deleteTodoSchema),
    isAuth,
    asyncHandler(deleteTodo)
)

todoRouter.get(
    `/:todoId`,
    validate(getTodoSchema),
    isAuth,
    asyncHandler(getTodo)
)

todoRouter.get(
    `/:userId/all`
)

export default todoRouter