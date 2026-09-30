import { Router } from "express";
import { createProject, getAllProjects,getProjectById } from "../controllers/projectControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post("/projects", createProject);
router.get("/projects", getAllProjects);
router.get("/projects/:id", getProjectById);

export default router;