import { query } from "../config/database";
import { Project } from "../types/project.types";

export const createProject = async (
    name: string,
    description: string,
    owner_id: number
): Promise<Project> => {
    const { rows } = await query(
        `INSERT INTO projects (name, description, owner_id)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, description, owner_id]
    );

    return rows[0];
};