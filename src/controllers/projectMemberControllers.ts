import { Request, Response } from "express";
import * as projectMemberService from "../service/projectMemberService"

export const addProjectMember = async (req: Request, res: Response) => {
    try {
        const project_id = parseInt(req.params.id as string, 10);
        const { user_id, role } = req.body;

        if (!user_id || !role) {
            return res.status(400).json({
                message: "User ID and role are required"
            });
        }

        if (role !== "Submitter" && role !== "Reviewer") {
            return res.status(400).json({
                message: "Role must be Submitter or Reviewer"
            });
        }

        const member = await projectMemberService.addProjectMember(
            project_id,
            user_id,
            role
        );

        return res.status(201).json(member);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error assigning user to project"
        });
    }
};