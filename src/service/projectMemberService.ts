import { query } from "../config/database";
import { ProjectMember } from "../types/projectMember.types"

export const addProjectMember = async (
    project_id: number,
    user_id: number,
    role: "Submitter" | "Reviewer"
): Promise<ProjectMember> => {
    const { rows } = await query(
        `INSERT INTO project_members (project_id, user_id, role)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [project_id, user_id, role]
    );

    return rows[0];
};