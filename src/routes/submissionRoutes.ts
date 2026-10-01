import { Router } from "express";
import {
    createSubmission,
    getSubmissionsByProject,
    getSubmissionById,
    updateSubmissionStatus, deleteSubmissionById
} from "../controllers/submissionControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.post("/submissions", createSubmission);
router.get("/projects/:id/submissions", getSubmissionsByProject);
router.get("/submissions/:id", getSubmissionById);
router.put("/submissions/:id/status", updateSubmissionStatus);
router.delete("/submissions/:id", deleteSubmissionById);

export default router;