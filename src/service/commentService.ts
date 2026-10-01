import { query } from "../config/database";
import { Comment } from "../types/comment.types";

export const createComment = async(
    submission_id: number,
     user_id: number,
     comment: string,
    line_number: number | null): 
    Promise<Comment> =>{
    const {rows} = await query(
        `INSERT INTO comments (submission_id, user_id, comment, line_number) 
        VALUES ($1, $2, $3, $4)
         RETURNING *`,
         [submission_id, user_id, comment, line_number]
    );
    return rows[0];
    };


    export const getCommentbySubmission = async (
        submission_id: number
    ): Promise<Comment[]> => {
        const { rows } = await query(
            `SELECT * FROM comments
             WHERE submission_id = $1
             ORDER BY created_at DESC`,
            [submission_id]
        );
    
        return rows;
    };

  export const updateComment = async (
    id: number,
    comment: string,
    line_number: number | null
): Promise<Comment | null> => {
    const { rows } = await query(
        `UPDATE comments
         SET comment = $1,
             line_number = $2
         WHERE id = $3
         RETURNING *`,
        [comment, line_number, id]
    );

    return rows[0] || null;
};

