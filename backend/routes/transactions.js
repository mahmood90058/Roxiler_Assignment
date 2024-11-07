import express from 'express';
import Product from '../models/Product.js';
import axios from "axios";

const router = express.Router();

router.get('/transactions', async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = '' } = req.query;
    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: isNaN(Number(search)) ? null : Number(search) },
          ].filter((condition) => condition.price !== null)
        }
      : {};
    const transactions = await Product.find(searchQuery)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    const totalTransactions = await Product.countDocuments(searchQuery);
    res.status(200).json({
      data: transactions,
      total: totalTransactions,
      page,
      perPage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
});

router.get('/statistics', async (req, res) => {
  const { month } = req.query;
  const monthNumber = parseInt(month, 10);
  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return res.status(400).json({ error: "Invalid month parameter" });
  }
  try {
    const statistics = await calculateStatistics(monthNumber);
    res.status(200).json(statistics);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Error fetching statistics" });
  }
});

const calculateStatistics = async (month) => {
  const salesData = await Product.find({
    $expr: { $eq: [{ $month: "$dateOfSale" }, month] }
  });
  const totalSales = salesData.reduce((sum, item) => sum + item.price, 0);
  const totalSoldItems = salesData.filter(item => item.sold).length;
  const totalNotSoldItems = salesData.length - totalSoldItems;
  return { totalSales, totalSoldItems, totalNotSoldItems };
};

router.get('/bar-chart', async (req, res) => {
  try {
    const { month = 'october' } = req.query;
    const startOfMonth = new Date(Date.UTC(2021, new Date(`${month} 1, 2021`).getMonth(), 1));
    startOfMonth.setUTCHours(0, 0, 0, 0);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setUTCMonth(endOfMonth.getUTCMonth() + 1);
    endOfMonth.setUTCHours(23, 59, 59, 999);
    const ranges = [
      { range: '0-100', min: 0, max: 100 },
      { range: '101-200', min: 101, max: 200 },
      { range: '201-300', min: 201, max: 300 },
      { range: '301-400', min: 301, max: 400 },
      { range: '401-500', min: 401, max: 500 },
      { range: '501-600', min: 501, max: 600 },
      { range: '601-700', min: 601, max: 700 },
      { range: '701-800', min: 701, max: 800 },
      { range: '801-900', min: 801, max: 900 },
      { range: '901-above', min: 901, max: Infinity },
    ];
    const chartData = await Promise.all(
      ranges.map(async (range) => {
        const productsInRange = await Product.find({
          dateOfSale: { $gte: startOfMonth, $lt: endOfMonth },
          price: { $gte: range.min, $lte: range.max }
        });
        const count = productsInRange.length;
        return { range: range.range, count };
      })
    );
    res.status(200).json(chartData);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ message: 'Error fetching bar chart data', error });
  }
});

router.get('/pie-chart', async (req, res) => {
  const { month } = req.query;
  const monthNumber = parseInt(month, 10);
  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return res.status(400).json({ error: 'Invalid month parameter' });
  }
  try {
    const salesData = await Product.find({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
    });
    if (salesData.length === 0) {
      return res.status(200).json([]);
    }
    const categoryCounts = salesData.reduce((acc, item) => {
      const category = item.category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    const pieChartData = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count
    }));
    res.status(200).json(pieChartData);
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).json({ error: 'Error fetching pie chart data' });
  }
});



export default router;
