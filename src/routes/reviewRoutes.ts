import { Router } from "express";
import { approveSubmission, getReviewHistory, requestChanges } from "../controllers/reviewControllers";
import { protect } from "../middleware/authMiddleware";


const router = Router();

router.use(protect);

router.post("submissions/:id/approve", approveSubmission);
router.post("submissions/:id/request-changes", requestChanges);
router.get("submissions/:id/reviews", getReviewHistory);

export default router;