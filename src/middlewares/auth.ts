import { Request, Response, NextFunction } from "express";
import { ResponseError, asyncHandler } from "../utils/errHandling";
import {verify} from 'jsonwebtoken'
import { IJwtPayload } from "../interfaces/jwt.interface";
import { UserModel } from "../../db/models/user.model";

declare global {
    namespace Express {
      export interface Request {
        user?: {
            _id: string;
            email: string
        };
      }
    }
  }

export const isAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {Authorization} = req.headers
    if (!Authorization) {
        return next(new ResponseError('Unauthorized', 401))
    }

    const decode = verify(`${Authorization}`, `${process.env.TOKEN_SIGNATURE}`) as IJwtPayload
    if (!decode?._id) {
        return next(new ResponseError('Unauthorized', 401))
    }

    const user = await UserModel.findById(decode.id).select('email')
    if (!user) {
        return next(new ResponseError('Unauthorized', 401))
    }
    req.user = {
        _id: user._id.toString(),
        email: user.email
    }
    next()
})