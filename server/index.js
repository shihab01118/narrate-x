import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './db/connectDB.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true
  })
);

app.use('/api/auth', authRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
