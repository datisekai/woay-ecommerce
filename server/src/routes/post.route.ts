import { Router } from "express";
import PostController from "../controllers/Post.controller";
import isLogin from "../middlewares/isLogin";
import isAdmin from "../middlewares/isAdmin";

const router = Router()


//get all post status true
router.get('/search', PostController.getAll)

//get all by admin
router.get('/', isLogin, isAdmin, PostController.getAllByAdmin)

//add post
router.post('/', isLogin, isAdmin, PostController.add)

//update post
router.put('/:id', isLogin, isAdmin, PostController.update)

//delete post
router.delete('/:id', isLogin, isAdmin, PostController.delete)


export default router;