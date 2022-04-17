import jwt from "jsonwebtoken";
import { jwt_secrete_key } from "../config/jwt.js"

const authentication = async (req, res, next) => {
    try {
        // token from cookie
        const authCookieToken = req.cookies.AuthToken;
        console.log(req.cookies);
        // checking if cookie has expired
        if (!authCookieToken) {
            return res.status(401).json({ errorMsg: 'Unauthorized' });
        }

        // varifying JWT
        const jwToken = await jwt.verify(authCookieToken, jwt_secrete_key);

        req.userId = jwToken.id;
        req.userRole = jwToken.role;
        next();
    
    }
    catch (err) {
        return res.status(401).json({ errorMsg: 'Unauthorized'});
        console.log(err);
    }
}

export default authentication;