const jwt = require("jsonwebtoken");

const secret = "secret";

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // 🔍 CHECK TOKEN EXISTS
    if (!token) {
      return res.status(401).json({
        message: "Token not present"
      });
    }

    // 🔍 CHECK BEARER FORMAT
    if (!token.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token is not Bearer format"
      });
    }

    // 🔍 EXTRACT TOKEN VALUE
    const tokenValue = token.split(" ")[1];

    // 🔐 VERIFY TOKEN
    const decodedData = jwt.verify(tokenValue, secret);
    console.log("DECODED TOKEN:",decodedData)

    // 🔥 IMPORTANT: ATTACH USER DATA TO REQUEST
   req.user = {
  id: decodedData.id || decodedData._id,  // ✅ FIXED
  role: decodedData.role
};
console.log("DECODED:", decodedData);
console.log("REQ.USER:", req.user);


    // 👉 Example: req.user = { id, email, role }

    next();

  } catch (err) {
    console.log(err);

    return res.status(401).json({
      message: "Unauthorized - Invalid or expired token"
    });
  }
};

module.exports = validateToken;