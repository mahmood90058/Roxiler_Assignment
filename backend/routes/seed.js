import express from 'express';
import axios from 'axios';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/seed', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    await Product.insertMany(transactions);
    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error });
  }
});

export default router;
