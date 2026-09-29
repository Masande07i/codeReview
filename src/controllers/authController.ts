import { Request, Response } from "express";
import * as userService from "../service/userService"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "Email is already in use" });
        }
        const newUser = await userService.createUser(email, password);
        res.status(201)
            .json({ message: "User registered successfully", userId: newUser.id });
    } catch (error) {
          console.log(error);
        res.status(500).json({ message: "Error registering the user" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(409).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const payload = { userId: user.id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};