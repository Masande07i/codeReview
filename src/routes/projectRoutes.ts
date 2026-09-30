import { Router } from "express";
import { createProject, getAllProjects,getProjectById,updateProjectById } from "../controllers/projectControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post("/projects", createProject);
router.get("/projects", getAllProjects);
router.get("/projects/:id", getProjectById);
router.put("/projects/:id", updateProjectById);

export default router;