import { Router } from "express";
import AuthRoutes from "./auth/auth-routes";
import TodoRoutes from "./tasks/todo-routes";

const router: Router = Router();

router.use("/api", AuthRoutes);
router.use("/api", TodoRoutes);

export default router;
