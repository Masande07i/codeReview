import { Router } from "express";
import { approveSubmission, requestChanges } from "../controllers/reviewControllers";
import { protect } from "../middleware/authMiddleware";


const router = Router();

router.use(protect);

router.post("submissions/:id/approve", approveSubmission);
router.post("submissions/:id/request-changes", requestChanges);

export default router;