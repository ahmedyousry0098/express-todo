import { NextFunction, RequestHandler, Request, Response } from "express"
import { UserModel } from "../../../db/models/user.model"
import { ResponseError } from "../../utils/errHandling"
import { TodoModel } from "../../../db/models/todo.model"

export const addTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {assignedTo, title, description, status} = req.body
    const assignedToUser = await UserModel.findById(assignedTo)
    if (!assignedToUser) {
        return next(new ResponseError('Assigned To User Not Found', 404))
    }
    const newTodo = await TodoModel.create({
        ...req.body
    })
    if (!newTodo) {
        return next (new ResponseError('Something Went Wrong Please Try Again', 500))
    }
    return res.status(201).json({message: 'Todo added Successfully'})
}

export const updateTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {todoId} = req.params
    const todo = await TodoModel.findById(todoId)
    if (!todo) {
        return next (new ResponseError('Todo Not Found', 404))
    }
    if (req.body?.assignedTo) {
        const assignedToUser = await UserModel.findById(req.body.assignedTo)
        if (!assignedToUser) {
            return next(new ResponseError('Assigned To User Not Found', 404))
        }
    }
    const newTodo = await TodoModel.findByIdAndUpdate(
        todoId,
        {...req.body},
        {new: true}
    )
    if (!newTodo) {
        return next (new ResponseError('Something Went Wrong Please Try Again', 500))
    }
    return res.status(200).json({message: 'Todo Updated Successfully'})
}

export const deleteTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {todoId} = req.params
    const todo = await TodoModel.findByIdAndDelete(todoId)
    if (!todo) {
        return next (new ResponseError('Todo Not Found', 404))
    }
    return res.status(200).json({message: 'Todo Deleted Successfully'})
}

export const getTodo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {todoId} = req.params
    const todo = await TodoModel.findById(todoId).populate({
        path: 'User',
        select: '-password'
    })
    if (!todo) {
        return next (new ResponseError('Todo Not Found', 404))
    }
    return res.status(200).json({message: 'Todo Deleted Successfully', todo})
}

export const getUserTodos: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.params
    const user = await UserModel.findById(userId) 
    if (!user) {
        return next(new ResponseError('User Not Found', 400))
    }
    const todos = await TodoModel.find({assignedTo: user._id})
    return res.status(200).json({message: `${user.username} todos: `, todos})
}