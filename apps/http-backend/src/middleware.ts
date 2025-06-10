import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from '@repo/backend-common/config';

export function Auth(req: Request, res: Response, next: NextFunction) {

        const token = req.headers['authorization'] ?? ""
        try {
                const decoded = jwt.verify(token, JWT_SECRET)

                if (decoded) {
                        //@ts-ignore
                        req.userId = decoded.id
                        next()
                }
                else {

                        res.status(403).json({
                                message: 'Unautharized'
                        })
                }
        }

        catch (error) {
                res.status(403).json({
                        message: 'Unautharized'
                })
        }
}