import { query } from "../config/database";
import { Review } from "../types/review.types";

export const approveSubmission = async (
    submission_id: number,
    reviewer_id: number
): Promise<Review> => {
    const { rows } = await query(
        `INSERT INTO reviews (submission_id, reviewer_id, status)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [submission_id, reviewer_id, "approved"]
    );

    await query(
        `UPDATE submissions
         SET status = $1
         WHERE id = $2`,
        ["approved", submission_id]
    );

    return rows[0];
};

export const requestChanges = async (
    submission_id: number,
    reviewer_id: number
): Promise<Review> => {
    const { rows } = await query(
        `INSERT INTO reviews (submission_id, reviewer_id, status)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [submission_id, reviewer_id, "changes_requested"]
    );

    await query(
        `UPDATE submissions
         SET status = $1
         WHERE id = $2`,
        ["changes_requested", submission_id]
    );

    return rows[0];
};

export const getReviewHistory = async (
    submission_id: number
): Promise<Review[]> => {
    const { rows } = await query(
        `SELECT * FROM reviews
         WHERE submission_id = $1
         ORDER BY created_at DESC`,
        [submission_id]
    );

    return rows;
};