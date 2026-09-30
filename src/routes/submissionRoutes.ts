import { Router } from "express";
import {createSubmission,getSubmissionsByProject} from "../controllers/submissionControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post("/submissions", createSubmission);
router.get("/projects/:id/submissions", getSubmissionsByProject);

export default router;