import { Router } from "express";
import RateController from "../controllers/Rate.controller";
import isLogin from "../middlewares/isLogin";

const router = Router();

//get rate by productid
router.get("/:productId", RateController.getAllByProductId);

//add rate
router.post("/:productId", isLogin, RateController.add);

//update rate
router.put("/:id", isLogin, RateController.update);

//delete rate
router.delete("/:id", isLogin, RateController.delete);

export default router;
