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

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await projectService.getAllProjects();

        return res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving projects"
        });
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10);

        const project = await projectService.getProjectById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        return res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving project"
        });
    }
};

export const updateProjectById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Project name is required"
            });
        }

        const project = await projectService.updateProjectById(
            id,
            name,
            description
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        return res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating project"
        });
    }
};