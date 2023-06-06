import express from 'express'
import { getProductById, createProduct, updateProductById, deleteProductById, getAllProduct } from '../controllers/ProductController.js'
// import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router()

// router.get('/:id', getUser);
// router.get('/',getAllUsers)
// router.put('/:id',authMiddleWare, updateUser)
// router.delete('/:id',authMiddleWare, deleteUser)
// router.put('/:id/follow',authMiddleWare, followUser)
// router.put('/:id/unfollow',authMiddleWare, unfollowUser)

router.get('/:id', getProductById);
router.get('/', getAllProduct)
router.put('/:id', updateProductById)
router.delete('/:id', deleteProductById)
router.post('/:id', createProduct)

export default router