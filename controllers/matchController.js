import { getAllMatches, validateAccessToken, getMatchByMatchId } from "../models/matchModel.js";
import pool from "../config/dbConfig.js";

export const getMatches = async (req, res) => {
  try {
    const matches = await getAllMatches();
    return res.status(200).json({ matches: matches });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMatchDetails = async(req, res)=>{
    const matchId = req.params.matchId;
    try{
        const match = await getMatchByMatchId(matchId);
        if(!match){
            res.status(404).json({message: "Match not found"});
        }
        //TO:DO
    }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const addMatch = async (req, res) => {
  const { team_1, team_2, date, venue } = req.body;

  try {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = authToken.split(" ")[1];
    const isValidToken = await validateAccessToken(accessToken);

    if (!isValidToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const [result] = await pool.query(
      "INSERT INTO matches (team_1, team_2, date, venue) VALUES (?, ?, ?, ?)",
      [team_1, team_2, date, venue]
    );

    const match_id = result.insertId.toString();

    return res.status(200).json({
      message: "Match created successfully",
      match_id: match_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};
