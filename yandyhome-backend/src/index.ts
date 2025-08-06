import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from '../src/routes/product.routes';
import { errorHandler } from './middleware/error.middleware';

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

// Health check
app.get('/', (_req, res) => {
    res.send('Yandy Home Furniture Backend is running on Vercel!');
});

// Product routes
app.use('/api/products', productRoutes);

// Error handler
app.use(errorHandler);

// ❌ NO app.listen()
// ✅ Export serverless handler
export const handler = serverless(app);
