import { Router } from "express";
import authRouter from "./Auth/authRoutes";
import userRouter from "./User/userRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
