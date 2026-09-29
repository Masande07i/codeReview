import { query } from "../config/database";
import bcrypt from "bcryptjs";
import { User } from "../types/user.types";

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const { rows } = await query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return rows[0] || null;
};

export const createUser = async (
    email: string,
    password: string
): Promise<User> => {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const { rows } = await query(
        "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
        [email, password_hash]
    );

    return rows[0];
};

export const findUserById = async (
    id: number
): Promise<User | null> => {
    const { rows } = await query(
        "SELECT id, email FROM users WHERE id = $1",
        [id]
    );

    return rows[0] || null;
};

export const updateUserById = async (
    id: number,
    email: string
): Promise<User | null> => {
    const { rows } = await query(
        "UPDATE users SET email = $1 WHERE id = $2 RETURNING id, email",
        [email, id]
    );

    return rows[0] || null;
};

export const deleteUserById = async (
    id: number
): Promise<User | null> => {
    const { rows } = await query(
        "DELETE FROM users WHERE id = $1 RETURNING id, email",
        [id]
    );

    return rows[0] || null;
};