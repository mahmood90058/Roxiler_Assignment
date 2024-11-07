import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import seedRoutes from "../backend/routes/seed.js"
import TransactionRoutes from "../backend/routes/transactions.js"
dotenv.config();
const app = express();

app.use(express.json());

app.use(cors()); 



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));


app.use('/api', seedRoutes);
app.use('/api', TransactionRoutes); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
