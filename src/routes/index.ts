import { Router } from "express";
import AuthRoutes from "./auth/auth-routes";

const router: Router = Router();

router.use("/api", AuthRoutes);

export default router;