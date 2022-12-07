const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log("verifyToken");
    const authHeader = req.headers.token;
    if (authHeader) {
        // token: Bearer <token itself>
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (error, user) => {
            // console.log("error", error);
            // console.log("user", user);
            if (error) {
                res.status(403).json("Token is not valid!")
            } else {
                /*
                user {
                        id: '638edb068ab0d6ff3509b70d',
                        isAdmin: false,
                        iat: 1670381475,
                        exp: 1670640675
                    }
                */
                req.user = user;
                next();
            }
        })

    } else {
        return res.status(401).json("You are not authenticated!");
    }
};


const verifyTokenAndAuthorization = (req, res, next) => {
    console.log("verifyTokenAndAuthorization");
    verifyToken(req, res, () => {
        // console.log(req.user.id);
        // console.log(req.params.id);
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    })
};

const verifyTokenAndAdmin = (req, res, next) => {
    console.log("verifyTokenAndAuthorization");
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    })
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };