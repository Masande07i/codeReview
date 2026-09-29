import { Router } from "express";
import { getUserById, updateUserById  } from "../controllers/userController"
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.get("/users/:id", getUserById);
router.put("/users/:id", updateUserById);

export default router;