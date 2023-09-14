import { createUser, getUserByUsername } from "../models/userModel.js";
import { comparePassword } from "../utils/bcryptUtils.js";

export const signup = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ status: "Username already exists" });
    }

    const userId = await createUser(username, password, email);

    return res.status(200).json({
      status: "Admin Account successfully created",
      status_code: 200,
      user_id: userId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(401).json({
        status: "Incorrect username/password provided. Please retry",
        status_code: 401,
      });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: "Incorrect username/password provided. Please retry",
        status_code: 401,
      });
    }

    return res.status(200).json({
      status: "Login successful",
      status_code: 200,
      user_id: user.user_id,
      access_token: user.access_token,
    });
  } catch (error) {
    return res.status(500).json({ status: "Internal server error" });
  }
};
