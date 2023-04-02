import { Router } from "express";
import authRouter from "./Auth/authRoutes";
import categoryRouter from "./Category/categoryRoutes";
import userRouter from "./User/userRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/categories", categoryRouter);

export default router;
