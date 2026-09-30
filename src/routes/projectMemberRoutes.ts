import { Router } from "express";
import { addProjectMember } from "../controllers/projectMemberControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post("/projects/:id/members", addProjectMember);


export default router;