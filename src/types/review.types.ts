export interface Review {
    id: number;
    submission_id: number;
    reviewer_id: number;
    status: "approved" | "changes_requested";
    created_at: Date;
}