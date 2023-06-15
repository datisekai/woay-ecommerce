import { Router } from "express";
import isLogin from "../middlewares/isLogin";
import isAdmin from "../middlewares/isAdmin";
import SizeController from "../controllers/Size.controller";

const router = Router()

//get all
router.get('/', isLogin, isAdmin, SizeController.getAll)

//add size
router.post('/', isLogin, isAdmin, SizeController.add)

//update size by id
router.put('/:id', isLogin, isAdmin, SizeController.update)

//delete size by id
router.delete('/:id', isLogin, isAdmin, SizeController.delete)

export default router;