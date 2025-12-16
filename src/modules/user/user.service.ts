import { pool } from "../../config/db"

const createUser = async (name: string, email: string, age: number) => {
    return await pool.query(`INSERT INTO users(name,email,age) VALUES($1,$2,$3) RETURNING *`, [name, email, age])
}

const getAllUser = async () => {
    const result = await pool.query(`SELECT * FROM users`)
    return result
}

const getUserById = async (id: string) => {
    return await pool.query(`SELECT * FROM users WHERE id=$1`, [id])
}

const updateAUser = async (id: string, name: string, email: string, age: number) => {
    return await pool.query(`UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4 RETURNING *`, [name, email, age, id])
}
const deleteUser = async (id: string) => {
    return await pool.query(`DELETE FROM users WERE id=$1 RETURNING *`, [id])
}
export const userServices = {
    createUser, getAllUser, getUserById, updateAUser, deleteUser
}