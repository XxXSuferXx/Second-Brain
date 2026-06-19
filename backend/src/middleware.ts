import type { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    userId: string;
}

export const authMiddleWare = (req:Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers["authorization"];
    
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
 
        return res.status(401).json({
            success: false,
            message: "Unauthorised Access! No Token Provided"
        })

    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(400).json({
            message: "Invalid token"
        })
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        const decoded = jwt.verify(token, secret) as DecodedToken;
        req.userId = decoded.userId;
       next();
    } catch(error) {
        return res.status(403).json({
            message: "Forbidden: Invalid or expired token"
        })
    }

}