import { Router } from "express";
import isLogin from "../middlewares/isLogin";
import OrderController from "../controllers/Order.controller";
import isAdmin from "../middlewares/isAdmin";

const router = Router()


//get my order
router.get('/me', isLogin, OrderController.getMyOrder)

//add order
router.post('/', isLogin, OrderController.add)

//get all order
router.get('/', isLogin, isAdmin, OrderController.getAllOrder)

//update status order
router.put('/:id', isLogin, isAdmin, OrderController.update)

export default router;