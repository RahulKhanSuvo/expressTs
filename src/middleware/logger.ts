import { Request, Response } from "express";
const logger = (req: Request, res: Response, next: Function) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
}
export default logger;