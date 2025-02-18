import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
  deleteMessage,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

// Your route code here
const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.delete("/:messageId", verifyToken, deleteMessage);

router.post("/send/:id", protectRoute, sendMessage);
export default router;
