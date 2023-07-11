const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
dotenv.config()

// TODO: middleware auth

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send("A token is required for auth");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;

        // const currentTimestamp = Math.floor(Date.now() / 1000);
        // if (decoded.exp < currentTimestamp) {
        //     return res.status(401).send("Token has expired");
        // }

        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

}

module.exports = verifyToken;


