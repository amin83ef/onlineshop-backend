import Product from '../models/Product.js';

export const getAllProducts = async (req , res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({message: 'خطا در دریافت محصول'});
    }
};

export const getOneProduct = async (req , res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message : 'محصولی یافت نشد'});
        res.json(product);
    } catch (error) {
        res.status(500).json({message : 'خطا در دریافت محصول'});
    }
};