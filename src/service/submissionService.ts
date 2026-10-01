import { query } from "../config/database";
import { Submission } from "../types/submission.types";

export const createSubmission = async (
    project_id: number,
    user_id: number,
    title: string,
    code: string
): Promise<Submission> => {
    const { rows } = await query(
        `INSERT INTO submissions (project_id, user_id, title, code)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [project_id, user_id, title, code]
    );

    return rows[0];
};

export const getSubmissionsByProject = async (
    project_id: number
): Promise<Submission[]> => {
    const { rows } = await query(
        `SELECT * FROM submissions
         WHERE project_id = $1
         ORDER BY created_at DESC`,
        [project_id]
    );

    return rows;
};

export const getSubmissionById = async (
    id: number
): Promise<Submission | null> => {
    const { rows } = await query(
        "SELECT * FROM submissions WHERE id = $1",
        [id]
    );

    return rows[0] || null;
};

export const updateSubmissionStatus = async (
    id: number,
    status: Submission["status"]
): Promise<Submission | null> => {
    const { rows } = await query(
        `UPDATE submissions
         SET status = $1
         WHERE id = $2
         RETURNING *`,
        [status, id]
    );

    return rows[0] || null;
};

export const deletesubmissionById = async (
    id: number
): Promise<Submission | null> => {
    const { rows } = await query(
        `DELETE FROM submissions
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return rows[0] || null;
};