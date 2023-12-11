import {Request, Response, NextFunction, RequestHandler} from 'express'
import { UserModel } from '../../../db/models/user.model'
import { ResponseError } from '../../utils/errHandling'
import { compareSync } from 'bcrypt'
import Jwt from 'jsonwebtoken'

export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {username, email, password} = req.body
    const existingUser = await UserModel.findOne({email})
    if (existingUser) {
        return next(new ResponseError('User Already Exist', 409))
    }
    const user = await UserModel.create({
        username,
        email,
        password
    })
    // hashing password done in mongoose middleware
    if (!user) {
        return next(new ResponseError('Something Went Wrong Please Try Again'))
    }
    return res.status(201).json({message: 'User Created Successfully'})
}

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    if (!user) {
        return next(new ResponseError('In-valid Email Or Password', 400))
    }
    const isPasswordMatch = compareSync(password, user.password)
    if (!isPasswordMatch) {
        return next(new ResponseError('In-valid Email Or Password', 400))
    }
    const token = Jwt.sign({_id: user.id, email: user.email}, `${process.env.TOKEN_SIGNATURE}`)
    return res.status(200).json({message: 'logged In Successfully', token})
}
