import { query } from "../config/database";
import { Notification } from "../types/notification.types";

export const createNotification = async (
    user_id: number,
    message: string
): Promise<Notification> => {
    const { rows } = await query(
        `INSERT INTO notifications (user_id, message)
         VALUES ($1, $2)
         RETURNING *`,
        [user_id, message]
    );

    return rows[0];
};

export const getNotificationsByUser = async (
    user_id: number
): Promise<Notification[]> => {
    const { rows } = await query(
        `SELECT * FROM notifications
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [user_id]
    );

    return rows;
};