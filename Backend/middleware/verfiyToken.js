import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret_token = process.env.ACCESS_TOKEN_SECRET;

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No Token Provided..!!" });
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret_token, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      req._id = decoded._id;
      next();
    });
  } catch (error) {
    console.log("Internal Server Error: " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
