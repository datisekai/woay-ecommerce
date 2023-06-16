import { Router } from "express";
import isLogin from "../middlewares/isLogin";
import isAdmin from "../middlewares/isAdmin";
import BlogController from "../controllers/Blog.controller";
const router = Router()

//chưa test

//get all blog status true
router.get('/', BlogController.getAll)


//add blog
router.post('/', isLogin, isAdmin, BlogController.add)

//update blog
router.put('/:id', isLogin, isAdmin, BlogController.update)

//delete blog
router.delete('/:id', isLogin, isAdmin, BlogController.delete)

export default router