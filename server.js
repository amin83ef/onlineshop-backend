import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config(); 
app.use(cors());

const app = express();
app.use(express.json()); 

import products from './routes/products.js';
import auth from './routes/auth.js';
import profile from './routes/profile.js';

app.use('/api/products', products);
app.use('/api/auth', auth);
app.use('/profile', profile)

const url = 'mongodb://127.0.0.1:27017/onlineshop';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
