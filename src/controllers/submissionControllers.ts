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

export const getSubmissionsByProject = async (req: Request, res: Response) => {
    try {
        const project_id = parseInt(req.params.id as string, 10);

        const submissions = await submissionService.getSubmissionsByProject(
            project_id
        );

        return res.status(200).json(submissions);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving submissions"
        });
    }
};

export const getSubmissionById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10);

        const submission = await submissionService.getSubmissionById(id);

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }

        return res.status(200).json(submission);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving submission"
        });
    }
};

export const updateSubmissionStatus = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const validStatuses = [
            "pending",
            "in_review",
            "approved",
            "changes_requested"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const submission = await submissionService.updateSubmissionStatus(
            id,
            status
        );

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }

        return res.status(200).json(submission);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating submission status"
        });
    }
};

export const deleteSubmissionById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10);

        const submission = await submissionService.deletesubmissionById(id);

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }

        return res.status(200).json({
            message: "Submission deleted successfully",
            submission
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting project"
        });
    }
};