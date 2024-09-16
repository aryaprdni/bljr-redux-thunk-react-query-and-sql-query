import pool from "../config/db";
import { UserRequest } from "../type/user-request";
import { Request, Response, NextFunction } from "express";
import { RowDataPacket } from 'mysql2/promise';
import { User } from "../model/user-model";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.get('X-API-TOKEN');

    if (token) {
        try {
            const [rows] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM users WHERE token = ?', [token]
            );
            
            const users = rows as User[];
            if (users) {
                const user = users[0];
                req.user = user;
                next();
                return;
            }
        } catch (error) {
            console.error('Database query failed:', error);
        }
    }

    res.status(401).json({
        error: 'Unauthorized'
    }).end();
}
