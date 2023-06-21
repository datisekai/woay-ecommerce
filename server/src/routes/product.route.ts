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
router.get('/variant',isLogin, isAdmin, ProductController.getAllVariant);

//get product by slug
router.get('/detail/:slug', ProductController.getProductBySlug)

//update product
router.put('/:id',isLogin, isAdmin, ProductController.update)

//add variant
router.post('/variant', isLogin, isAdmin, ProductController.addVariant)

//update sku
router.put('/variant/:id', isLogin, isAdmin, ProductController.updateVariant)

//delete sku
router.delete('/variant/:id', isLogin, isAdmin, ProductController.deleteVariant)

//get all by admin
router.get('/', isLogin, isAdmin, ProductController.getAllByAdmin)

//confirm cart
router.post('/cart',isLogin, ProductController.cart)

export default router;