import { validateAccessToken } from "../models/matchModel.js";
import { getPlayerById } from "../models/playerModel.js";

export const getPlayerStats = async(req, res)=>{
    const playerId = req.params.player_id;
    try{
        const authToken = req.headers.authorization;

        if (!authToken || !authToken.startsWith("Bearer ")) {
          return res.status(401).json({ message: "Unauthorized" });
        }
    
        const accessToken = authToken.split(" ")[1];
        const isValidToken = await validateAccessToken(accessToken);
    
        if (!isValidToken) {
          return res.status(401).json({ message: "Invalid token" });
        }

        const result = await getPlayerById(playerId);
        if(!result){
            return res.status(404).json({message: "Player does not exist"});
        }
        return res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server error"})
    }
}