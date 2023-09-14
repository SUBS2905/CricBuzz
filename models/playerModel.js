import pool from "../config/dbConfig.js";

export const getPlayerById = async(playerId) =>{
    try{
        const [result] = await pool.query("SELECT * FROM player WHERE player_id=?", [playerId]);
        return result[0];
    }catch(err){
        throw err;
    }
}