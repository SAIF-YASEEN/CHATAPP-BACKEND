import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    secure: process.env.NODE_ENV === "production", // Ensures HTTPS usage
    sameSite: "None", // Required for cross-origin authentication
  });

  return token;
};
