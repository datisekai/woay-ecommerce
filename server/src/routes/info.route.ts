import { Router } from "express";
import isLogin from "../middlewares/isLogin";
import InfoController from "../controllers/Info.controller";

const router = Router()


//Get all my address info
router.get('/', isLogin, InfoController.getAll)

//add address info
router.post('/', isLogin, InfoController.add)

//update address info
router.put('/:id', isLogin, InfoController.update)

//delete address info
router.delete('/:id', isLogin, InfoController.delete)


//set default info
router.put('/default/:id', isLogin, InfoController.setDefault)
export default router;