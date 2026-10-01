import { Router } from "express";
import { createComment } from "../controllers/commentControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();            

router.use(protect);

router.post("/submissions/:id/comments", createComment);

export default router;
