import { Router } from "express";
import { createProject } from "../controllers/projectControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post("/projects", createProject);

export default router;