import express from 'express'
const router = express.Router();

import {getAllProducts , getOneProduct} from '../controllers/productsController.js';

router.get('/', getAllProducts);
router.get('/:id' , getOneProduct);

export default router;