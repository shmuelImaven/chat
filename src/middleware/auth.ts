import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import logger from '../logger';
import { config } from '../config';

const SECRET_KEY = config.secret_key;  // This should be securely stored, not hard-coded.

interface JwtPayload {
    id: number;
    username: string;
    iat?: number;
    exp?: number;
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    logger.info(JSON.stringify(authHeader))

    const token = authHeader && authHeader.split(' ')[1];
   // logger.info(JSON.stringify(token))

    if (!token) {
        logger.info("no token")

        return res.sendStatus(401);  // Unauthorized
    }
    try {
       // logger.info(SECRET_KEY);

       // logger.info(token);
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        console.log('-------------------------------',JSON.stringify(req.user))
        next();  // Proceed to the next middleware or route handler.
    } catch (error) {
        logger.error('@@@@@@@@@@',error);
        return res.sendStatus(403);  // Forbidden
    }
};
