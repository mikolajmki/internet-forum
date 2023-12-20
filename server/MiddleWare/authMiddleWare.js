import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET_KEY;

const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (token){
            const decoded = jwt.verify(token, secret);
            console.log(decoded.id);
            req.body.userId = decoded?.id;
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Session expired. Log in again." });
    }
};

export default authMiddleWare;