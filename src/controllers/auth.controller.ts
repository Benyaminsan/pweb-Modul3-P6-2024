import { Request, Response } from 'express';
import { register, login } from '../services/auth.service';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        const result = await register(username, email, password);
        res.status(201).json(result);
    } catch (error: any) {
        console.error(error);
        res.status(401).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const result = await login(username, password);
        res.status(200).json(result);
    } catch (error: any) {
        console.error(error);

        if (error.message === 'User not registered') {
            res.status(401).json({
                status: 'error',
                message: error.message,
            });
        } else if (error.message === 'Invalid credentials') {
            res.status(401).json({
                status: 'error',
                message: error.message,
            });
        }
    }
};
