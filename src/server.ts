import express, { Request, Response } from 'express'
import dotenv from "dotenv"
import path from "path"
import initDB, { pool } from './config/db'
import config from './config'
import logger from './middleware/logger'
import { userRoutes } from './modules/user/user.routes'

dotenv.config({ path: path.join(process.cwd(), ".env") })
const app = express()
// parser 
app.use(express.json())

// db 

initDB()
// logger middleware

// app.use(express.urlencoded())
app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello World!')
})
// users crud
app.use("/users", userRoutes)
// app.post("/users", async (req: Request, res: Response) => {
//     console.log(req.body);
//     const { name, email } = req.body
//     try {
//         const result = await pool.query(
//             `INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`,
//             [name, email]
//         )
//         res.status(201).json({
//             success: true,
//             message: "User created successfully",
//             data: result.rows[0]
//         })
//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })

//     }
// })
// get all users
// app.get("/users", async (req: Request, res: Response) => {
//     try {
//         const result = await pool.query(`SELECT * FROM users`)
//         res.status(200).json({
//             success: true,
//             message: "Users fetched successfully",
//             data: result.rows
//         })

//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//             details: error

//         })
//     }
// })
// get a user
app.get("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    console.log(id);
    try {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
        console.log(result);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: result.rows[0]
        })
    } catch (error) {

    }
})
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path

    })
})
app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
