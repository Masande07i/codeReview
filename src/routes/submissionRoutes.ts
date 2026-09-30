import { Router } from "express";
import { createSubmission } from "../controllers/submissionControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post("/submissions", createSubmission);

export default router;