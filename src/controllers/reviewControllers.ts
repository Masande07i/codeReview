import { Request, Response } from "express";
import * as reviewService from "../service/reviewService";

export const approveSubmission = async (req: Request, res: Response) => {
    try {
        const submission_id = parseInt(req.params.id as string, 10);

        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        if (req.user.role !== "Reviewer") {
            return res.status(403).json({
                message: "Only reviewers can approve submissions"
            });
        }

        const review = await reviewService.approveSubmission(
            submission_id,
            req.user.id
        );

        return res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error approving submission" });
    }
};

export const requestChanges = async (req: Request, res: Response) => {
    try {
        const submission_id = parseInt(req.params.id as string, 10);

        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        if (req.user.role !== "Reviewer") {
            return res.status(403).json({
                message: "Only reviewers can request changes"
            });
        }

        const review = await reviewService.requestChanges(
            submission_id,
            req.user.id
        );

        return res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error requesting changes" });
    }
};

export const getReviewHistory = async (req: Request, res: Response) => {
    try {
        const submission_id = parseInt(req.params.id as string, 10);

        const reviews = await reviewService.getReviewHistory(
            submission_id
        );

        return res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving review history" });
    }
};