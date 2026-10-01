import { Request, Response } from "express";
import * as commentService from "../service/commentService";

export const createComment = async (req: Request, res: Response) => {
    try {
        const submission_id = parseInt(req.params.id as string, 10);
        const { comment, line_number } = req.body;

        if (!comment) {
            return res.status(400).json({
                message: "Comment is required"
            });
        }

        if (!req.user) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        if (req.user.role !== "Reviewer") {
            return res.status(403).json({
                message: "Only reviewers can comment"
            });
        }

        const newComment = await commentService.createComment(
            submission_id,
            req.user.id,
            comment,
            line_number ?? null
        );

        return res.status(201).json(newComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating comment"
        });
    }
};


export const getCommentsBySubmission = async (req: Request, res: Response) => {
    try {
        const submission_id = parseInt(req.params.id as string, 10);

        const comments = await commentService.getCommentbySubmission(
            submission_id
        );

        return res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving comments"
        });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const { comment, line_number } = req.body;

        if (!comment) {
            return res.status(400).json({
                message: "Comment is required"
            });
        }

        const updatedComment = await commentService.updateComment(
            id,
            comment,
            line_number ?? null
        );

        if (!updatedComment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        return res.status(200).json(updatedComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating comment"
        });
    }
};
     

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10);

        const deletedComment = await commentService.deleteComment(id);

        if (!deletedComment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        return res.status(200).json({
            message: "Comment deleted successfully",
            comment: deletedComment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting comment"
        });
    }
};