import express from "express";
import { getPlayerStats } from "../controllers/playerController.js";

const router = express.Router();

router.get("/:player_id/stats", getPlayerStats);

export default router;