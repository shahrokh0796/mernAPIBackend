const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader, " <---authHeader");
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header is missing or invalid." });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403); //forbidden, invalid token
            }
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT;