import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    const { name, email, age } = req.body;
    try {
        await userServices.createUser(name, email, age)
        res.status(201).json({
            success: true,
            message: "Api is working"
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }


}
// get user 
const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUser()
        res.status(200).json({
            success: true,
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}
// getUser
const getUserById = async (req: Request, res: Response) => {

    try {
        const result = await userServices.getUserById(req.params.id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "user not found"
            })
        } else {
            res.status(200).json({
                success: true,
                data: result.rows[0]
            })
        }

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}

// update a user 
const updateAUser = async (req: Request, res: Response) => {
    const { name, email, age } = req.body;
    try {
        const result = await userServices.updateAUser(req.params.id!, name, email, age)
        if (result.rows.length === 0) {
            res.status(404).json({
                status: false,
                message: "user not found"

            })
        } else {
            res.status(200).json({
                status: true,
                message: "successful",
                data: result.rows[0]
            })
        }

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}

// delete user
const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.deleteUser(req.params.id!)

        if (result.rowCount === 0) {
            res.status(404).json({
                status: false,
                message: "user not found"

            })
        } else {
            res.status(200).json({
                status: true,
                message: "delete successful",
                data: result.rows[0]
            })
        }


    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}

export const userControllers = { createUser, getAllUser, getUserById, updateAUser, deleteUser }