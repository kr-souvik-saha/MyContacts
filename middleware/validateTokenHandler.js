const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Func to validate token
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            } else {
                // This info is the info of the user who have sent the token and its varified
                req.user = decoded.user;
                next();
            }
        });

        if (!token) {
            res.status(401);
            throw new Error("Invalid token or token is missing");
        }
    }
});

module.exports = validateToken;