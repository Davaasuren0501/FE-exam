const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
    
    console.log('====================================');
    console.log( req.headers);
    console.log('====================================');

    const tokenUser = req.headers.token; 
    if( !tokenUser ) {
        return res.status(401).json(
            {
                success: false
                , message: "User access token undefined" 
            }
        );
    }

    try {
        const requestUser = jwt.verify( tokenUser, process.env.JWT_SECRET );
        req.user = await User.findById( requestUser.id );
        next();
    } catch (err) {
        res.status(401).json(
            {
                success: false
                , message: "Invalid User Access Token" 
            }
        );
    }
};

module.exports = isAuth;
