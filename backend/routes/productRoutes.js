import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi: " + error.message });
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    const { title, price, category, description, image, images } = req.body;
    
    const newProduct = new Product({
      title,
      price,
      category,
      description,
      image,
      images
    });

    const savedProduct = await newProduct.save();
    
    // Convert _id to id for frontend compatibility
    const productToSend = {
      ...savedProduct._doc,
      id: savedProduct._id.toString()
    };
    
    res.status(201).json(productToSend);
  } catch (error) {
    res.status(400).json({ message: "Xato yuz berdi: " + error.message });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Mahsulot topilmadi" });
    res.json({ message: "Mahsulot o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi: " + error.message });
  }
});

export default router;
