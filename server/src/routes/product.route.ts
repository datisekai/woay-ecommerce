import { Router } from "express";
import isLogin from "../middlewares/isLogin";
import isAdmin from "../middlewares/isAdmin";
import ProductController from "../controllers/Product.controller";

const router = Router()


//add product
router.post('/', isLogin, isAdmin, ProductController.add)


//get all in client
router.get('/search',ProductController.getAll)

//get all sju
router.get('/sku',isLogin, isAdmin, ProductController.getAllSku);

//get product by slug
router.get('/detail/:slug', ProductController.getProductBySlug)

//update product
router.put('/:id',isLogin, isAdmin, ProductController.update)

//update sku
router.put('/sku/:id', isLogin, isAdmin, ProductController.updateSKU)

//delete sku
router.delete('/sku/:id', isLogin, isAdmin, ProductController.deleteSKU)

//confirm cart
router.post('/cart',isLogin, ProductController.cart)

export default router;