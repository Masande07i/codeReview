import { Router } from "express";
import { createComment , getCommentsBySubmission } from "../controllers/commentControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();            

router.use(protect);

router.post("/submissions/:id/comments", createComment);
router.get("/submissions/:id/comments", getCommentsBySubmission);

export default router;
