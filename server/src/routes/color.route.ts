import { Router } from "express";
import isLogin from "../middlewares/isLogin";
import isAdmin from "../middlewares/isAdmin";
import ColorController from "../controllers/Color.controller";

const router = Router()

//get all
router.get('/', isLogin, isAdmin, ColorController.getAll)

//add color
router.post('/', isLogin, isAdmin, ColorController.add)

//update color by id
router.put('/:id', isLogin, isAdmin, ColorController.update)

//delete color by id
router.delete('/:id', isLogin, isAdmin, ColorController.delete)

export default router;