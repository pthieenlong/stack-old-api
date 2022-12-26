import { Router } from 'express';

import AuthVerify from '../middleware/AuthVerify.middleware';
import UserVerify from '../middleware/UserVerify.middleware';
import OrderController from '../controller/Order.controller';

const router : Router = Router();

router.route('/')
        .get(OrderController.getAll)
        .post(AuthVerify, UserVerify, OrderController.create);

router.route('/:id')
        .get(OrderController.getOne)
        .put(AuthVerify, UserVerify, OrderController.update)
        .delete(AuthVerify, UserVerify, OrderController.softDelete);

router.put('/restore/:id',AuthVerify, UserVerify, OrderController.restore);
router.delete('/force/:id', AuthVerify, UserVerify, OrderController.forceDelete);

export default router;