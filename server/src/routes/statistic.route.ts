import { Router } from "express";
import isLogin from "../middlewares/isLogin";
import isAdmin from "../middlewares/isAdmin";
import StatisticController from "../controllers/Statistic.controller";

const router = Router()

router.get('/', isLogin, isAdmin, StatisticController.getAll)

export default router