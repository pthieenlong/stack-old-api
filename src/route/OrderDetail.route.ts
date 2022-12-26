import { Router } from 'express';

import AuthVerify from '../middleware/AuthVerify.middleware';
import UserVerify from '../middleware/UserVerify.middleware';
import OrderDetailController from '../controller/OrderDetail.controller';

const router : Router = Router();

router.route('/')
        .get(OrderDetailController.getAll)
        .post(AuthVerify, UserVerify, OrderDetailController.create);

router.route('/:id')
        .get(OrderDetailController.getOne)
        .put(AuthVerify, UserVerify, OrderDetailController.update)
        .delete(AuthVerify, UserVerify, OrderDetailController.softDelete);

router.put('/restore/:id',AuthVerify, UserVerify, OrderDetailController.restore);
router.delete('/force/:id', AuthVerify, UserVerify, OrderDetailController.forceDelete);

export default router;