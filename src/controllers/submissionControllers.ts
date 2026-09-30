import { Request, Response } from "express";
import * as submissionService from "../service/submissionService";

export const createSubmission = async (req: Request, res: Response) => {
    try {
        const { project_id, title, code } = req.body;

        if (!project_id || !title || !code) {
            return res.status(400).json({
                message: "Project ID, title and code are required"
            });
        }

        if (!req.user) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const submission = await submissionService.createSubmission(
            project_id,
            req.user.id,
            title,
            code
        );

        return res.status(201).json(submission);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating submission"
        });
    }
};