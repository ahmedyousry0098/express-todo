import { Router } from "express";
import { asyncHandler } from "../../utils/errHandling";
import { login, register } from "./user.controller";
import { validate } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "./user.validation";

const userRouter = Router()

userRouter.post(
    '/register',
    validate(registerSchema),
    asyncHandler(register)
);

userRouter.post(
    `/login`,
    validate(loginSchema),
    asyncHandler(login)
)

export default userRouter