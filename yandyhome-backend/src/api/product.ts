import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from '../routes/product.routes';
import { errorHandler } from '../middleware/error.middleware';

dotenv.config();

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL || '').split(',').map(url => url.trim());

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Yandy Home Furniture Backend is running on Vercel!');
});

app.use('/api/products', productRoutes);
app.use(errorHandler);

export default serverless(app); // Vercel expects default export
