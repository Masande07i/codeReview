export interface Notification {
    id: number;
    user_id: number;
    message: string;
    created_at: Date;
    is_read: boolean;
}