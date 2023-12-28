import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  // Extract the JWT from the cookies
  const token = req.cookies.accessToken;

  // Check if the token exists
  if (!token) return next(createError(401, "You are not authenticated!"));

  // Verify the token using the JWT_KEY from the environment variables
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    // If there's an error in verification, return an error response
    if (err) return next(createError(403, "Token is not valid!"));

    // If the token is valid, extract user information from the payload
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
// are extracting information from the payload of the JSON Web Token (JWT). The payload is the decoded content of the token, which includes any data that was embedded when the token was created.

    // Call the next middleware in the chain
    next();
  });
};
