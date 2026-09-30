export interface Submission {
    id: number;
    project_id: number;
    user_id: number;
    title: string;
    code: string;
    status: "pending" | "in_review" | "approved" | "changes_requested";
    created_at: Date;
}