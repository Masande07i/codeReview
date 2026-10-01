export interface Comment {
    id: number;
    submission_id: number;
    user_id: number;
    comment: string;
    line_number: number | null;
    created_at: Date;
}