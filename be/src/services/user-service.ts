import pool from "../config/db";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, toUserResponse, UpdateUserRequest, User, UserResponse } from "../model/user-model";
import { loginSchema, registerSchema, updateSchema } from "../validation/validationSchema";
import bcrypt from 'bcrypt';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';

export class UserService {

    static async register(request: CreateUserRequest) : Promise<UserResponse> {
        const registerRequest = await registerSchema.validate(request);

        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM users WHERE email = ?', [registerRequest.email]
        );
        
        const existingUsers = rows as RowDataPacket[];
        
        if (existingUsers.length > 0) {
            throw new ResponseError(400, 'Email already exists');
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            [registerRequest.name, registerRequest.email, registerRequest.password]
        );

        const userId = result.insertId;

        const [userRows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [userId]);

        const user = userRows[0] as RowDataPacket;

        if (!user) {
            throw new ResponseError(404, 'User not found');
        }

        return toUserResponse(user);
    }

    static async login (request: LoginUserRequest) : Promise<UserResponse> {
        const loginRequest = await loginSchema.validate(request);

        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM users WHERE email = ?', [loginRequest.email]
        );

        let user = rows[0] as RowDataPacket;

        if (!user) {
            throw new ResponseError(401, 'Username or password is wrong');
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new ResponseError(401, 'Username or password is wrong');
        }

       const token = uuidv4();

       await pool.query(
           'UPDATE users SET token = ? WHERE id = ?', [token, user.id]
       )

       const UserResponse = toUserResponse(user);
       UserResponse.token = token;
       return UserResponse;
    }

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = await updateSchema.validate(request);

        const updates: string[] = [];
        const values: any[] = [];

        if (updateRequest.name) {
            updates.push('name = ?');
            values.push(updateRequest.name);
        }

        if (updateRequest.password) {
            updates.push('password = ?');
            values.push(await bcrypt.hash(updateRequest.password, 10));
        }

        if (updates.length === 0) {
            throw new ResponseError(400, 'No fields to update');
        }

        values.push(user.id);

        const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

        const [result] = await pool.query<ResultSetHeader>(query, values);

        if (result.affectedRows === 0) {
            throw new ResponseError(404, 'User not found');
        }

        const [updatedUserRows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [user.id]);
        const updatedUser = updatedUserRows[0] as RowDataPacket;

        if (!updatedUser) {
            throw new ResponseError(404, 'User not found');
        }

        return toUserResponse(updatedUser);
    }
}
