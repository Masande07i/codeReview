import { Express, Router } from "express";
import { approveSubmission } from "../controllers/reviewControllers";
import { protect } from "../middleware/authMiddleware";


const router = Router();

router.use(protect);

router.post("submissions/:id/approve", approveSubmission);

export default router;