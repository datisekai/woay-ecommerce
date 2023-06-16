import { Router } from "express";
import CategoryController from "../controllers/Category.controller";
import isLogin from "../middlewares/isLogin";
import isAdmin from "../middlewares/isAdmin";
const router = Router()

//chưa test

//get all category status true
router.get('/', CategoryController.getAll)

//add category
router.post('/', isLogin, isAdmin, CategoryController.add)

//update category
router.put('/:id', isLogin, isAdmin, CategoryController.update)

//delete category
router.delete('/:id', isLogin, isAdmin, CategoryController.delete)

export default router