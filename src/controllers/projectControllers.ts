import { Request, Response } from "express";
import * as projectService from "../service/projectService";

export const createProject = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Project name is required"
            });
        }

        if (!req.user) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const project = await projectService.createProject(
            name,
            description,
            req.user.id
        );

        return res.status(201).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating project"
        });
    }
};