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

export const getAllProjects = async (): Promise<Project[]> => {
    const { rows } = await query(
        "SELECT * FROM projects ORDER BY created_at DESC"
    );

    return rows;
};

export const getProjectById = async (
    id: number
): Promise<Project | null> => {
    const { rows } = await query(
        "SELECT * FROM projects WHERE id = $1",
        [id]
    );

    return rows[0] || null;
};

export const updateProjectById = async (
    id: number,
    name: string,
    description: string
): Promise<Project | null> => {
    const { rows } = await query(
        `UPDATE projects
         SET name = $1,
             description = $2
         WHERE id = $3
         RETURNING *`,
        [name, description, id]
    );

    return rows[0] || null;
};