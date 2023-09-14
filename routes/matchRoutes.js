import express from "express";
import { getMatches, addMatch, getMatchDetails } from "../controllers/matchController.js";

const router = express.Router();

router.get("/", getMatches);
router.post("/", addMatch);
router.get("/:matchId", getMatchDetails);

export default router;