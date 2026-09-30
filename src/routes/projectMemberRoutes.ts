import { Router } from "express";
import { addProjectMember ,removeProjectMember} from "../controllers/projectMemberControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post("/projects/:id/members", addProjectMember);
router.delete("/projects/:id/members/:userId", removeProjectMember);


export default router;