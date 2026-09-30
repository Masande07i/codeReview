import { query } from "../config/database";
import { Project } from "../types/project.types";

export const addProjectMember = async (
    project_id: number,
    user_id: number
): Promise<Project | null> => {
    const { rows } = await query(
        `UPDATE projects
         SET member_ids = array_append(member_ids, $1)
         WHERE id = $2
         RETURNING *`,
        [user_id, project_id]
    );

    return rows[0] || null;
};

export const removeProjectMember = async (
    project_id: number,
    user_id: number
): Promise<Project | null> => {
    const { rows } = await query(
        `UPDATE projects
         SET member_ids = array_remove(member_ids, $1)
         WHERE id = $2
         RETURNING *`,
        [user_id, project_id]
    );

    return rows[0] || null;
};