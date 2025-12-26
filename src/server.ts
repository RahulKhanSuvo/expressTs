import express, { Request, Response } from 'express'
import config from './config';
import initDB, { pool } from './config/db';
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';
import { authRoutes } from './modules/auth/auth.route';
const app = express();
const port = config.port;
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// initializing db
initDB()

app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello World nai!')
})
app.use("/users", userRoutes)

// app.use("/auth", authRoutes)

// todo crud
app.post("/todos", async (req: Request, res: Response) => {
    const { user_id, title } = req.body

    try {
        const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1,$2) RETURNING *`, [user_id, title])
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
})
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "route Not fond",
        path: req.path
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
