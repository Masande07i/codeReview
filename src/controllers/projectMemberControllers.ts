import { Request, Response } from "express";
import * as projectMemberService from "../service/projectMemberService";
import * as projectService from "../service/projectService";

export const addProjectMember = async (req: Request, res: Response) => {
    try {
        const project_id = parseInt(req.params.id as string, 10);
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        if (!req.user) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const project = await projectService.getProjectById(project_id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.owner_id !== req.user.id) {
            return res.status(403).json({
                message: "Only the project owner can assign members"
            });
        }

        const updatedProject = await projectMemberService.addProjectMember(
            project_id,
            user_id
        );

        return res.status(200).json(updatedProject);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error assigning user to project"
        });
    }
};

export const removeProjectMember = async (req: Request, res: Response) => {
    try {
        const project_id = parseInt(req.params.id as string, 10);
        const user_id = parseInt(req.params.userId as string, 10);

        if (!req.user) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const project = await projectService.getProjectById(project_id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.owner_id !== req.user.id) {
            return res.status(403).json({
                message: "Only the project owner can remove members"
            });
        }

        const updatedProject = await projectMemberService.removeProjectMember(
            project_id,
            user_id
        );

        return res.status(200).json(updatedProject);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error removing user from project"
        });
    }
};