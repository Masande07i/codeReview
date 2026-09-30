export interface Project {
    id: number;
    name: string;
    description?: string;
    owner_id: number;
    created_at: Date;
    member_ids: number[];
}