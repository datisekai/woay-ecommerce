import { Router } from "express";
import User from "../models/User.model";
import UserController from "../controllers/User.controller";
import isLogin from "../middlewares/isLogin";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

//get all user
router.get("/", isLogin, isAdmin, UserController.getAll);

//create new user
router.post("/", isLogin, isAdmin, UserController.add);

//login
router.post("/login", UserController.login);

//register
router.post("/register", UserController.register);

//get my info by token
router.get("/me", UserController.getInfoByToken);

//get info user by id
router.get('/detail/:id', isLogin, isAdmin, UserController.getUserById)


//Chưa test

//update user
router.put('/:id', isLogin, isAdmin, UserController.update)

//update my profile
router.put('/', isLogin, UserController.updateMyInfo)

//delete user
router.delete('/:id', isLogin, isAdmin, UserController.delete)


export default router;
