import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import matchRouter from "./routes/matchRoutes.js";
import playerRouter from "./routes/playerRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/admin", authRouter);
app.use("/api/matches", matchRouter);
app.use("/api/players", playerRouter);

app.get("/", (req, res) => {
  res.send({ message: "" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});
