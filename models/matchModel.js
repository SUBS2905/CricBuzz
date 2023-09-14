import pool from "../config/dbConfig.js";

export const getAllMatches = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM matches");
    return rows;
  } catch (error) {
    throw error;
  }
};

export const getMatchByMatchId = async (matchId) =>{
    try{
        const [result] = await pool.query("SELECT * FROM matches where match_id=?", [matchId]);
        return result;
    }catch(err){
        throw err;
    }
}

export const validateAccessToken = async (accessToken) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE access_token = ?",
      [accessToken]
    );

    if (rows.length === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
