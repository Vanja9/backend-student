import { Router } from "express";
import { UserService } from "../services/user.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = Router();



userRouter.post("/", async(req,res)=>{
    const students = UserService.createUser(req.body);
    res.json(students);
})

userRouter.use(authMiddleware)

export default userRouter

