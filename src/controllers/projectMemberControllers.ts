import { Request, Response } from "express";
import * as projectMemberService from "../service/projectMemberService"

export const addProjectMember = async (req: Request, res: Response) => {
    try {
        const project_id = parseInt(req.params.id as string, 10);
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const project = await projectMemberService.addProjectMember(
            project_id,
            user_id
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
            message: "Error assigning user to project"
        });
    }
};
