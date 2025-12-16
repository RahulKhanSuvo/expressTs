import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router()

router.post("/", userControllers.createUser)

router.get("/", userControllers.getAllUser)

router.get("/:id", userControllers.getUserById)

router.patch("/:id", userControllers.updateAUser)

router.delete("/:id", userControllers.updateAUser)

export const userRoutes = router