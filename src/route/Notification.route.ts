import express from 'express';
import NotificationController from '../controller/Notification.controller';
import AuthVerify from '../middleware/AuthVerify.middleware';

const router = express.Router();

router.route('/')
    .get(AuthVerify, NotificationController.getNotificationsByRecipient)
    .post(AuthVerify, NotificationController.createNotify);
    
router.get('/new', AuthVerify, NotificationController.getNotificationsNotSeenByRecipient);
router.put('/action/:id', AuthVerify, NotificationController.actionSeenNotify);

export default router;