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