import { Request, Response } from "express";
import * as notificationService from "../service/notificationService";

export const getNotificationsByUser = async (
    req: Request,
    res: Response
) => {
    try {
        const user_id = parseInt(req.params.id as string, 10);

        const notifications =
            await notificationService.getNotificationsByUser(user_id);

        return res.status(200).json(notifications);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error retrieving notifications"
        });
    }
};