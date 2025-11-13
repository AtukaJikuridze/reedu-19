const jwt = require("jsonwebtoken");
require("dotenv").config();
function getToken(headers) {
  if (!headers["authorization"]) return null;
  const [type, token] = headers["authorization"].split(" ");
  return type === "Bearer" ? token : null;
}

async function isAuth(req, res, next) {
  const token = getToken(req.headers);
  console.log(token);
  if (!token)
    return res.status(401).json({ message: "permision denide", data: null });
  try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload)
    req.userId = payload.userId;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res
      .status(401)
      .json({ message: "Invalid token", error: error.message });
  }
}

module.exports = isAuth;
