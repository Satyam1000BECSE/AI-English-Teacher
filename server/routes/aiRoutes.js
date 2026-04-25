import express from "express";
import { nextMessage } from "../controllers/aiController.js";
import { checkJwt } from "../middleware/auth.js";

const router = express.Router();

router.post("/next", checkJwt, nextMessage);

export default router;