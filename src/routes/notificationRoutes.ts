import { Router } from "express";
import { getNotificationsByUser } from "../controllers/notificationControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.get("/users/:id/notifications", getNotificationsByUser);

export default router;