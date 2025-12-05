import express, { Request, Response } from 'express'
import { pool } from '../../config/db';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const { name, email } = req.body
    try {
        const result = await userServices.createUserIntoDb(name, email)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}
export const userController = {
    createUser
}