import { Router } from "express";
import authRouter from "./Auth/authRoutes";
import cartRouter from "./Cart/cartRoutes";
import categoryRouter from "./Category/categoryRoutes";
import productRouter from "./Product/productRoutes";
import userRouter from "./User/userRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/carts", cartRouter)

export default router;
