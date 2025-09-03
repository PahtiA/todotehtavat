import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import todoRouter from './routes/todoRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', todoRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
