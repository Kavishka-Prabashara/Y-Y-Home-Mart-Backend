import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

// ✅ CORS Configuration
// ✅ CORS Configuration
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',') // Comma එකෙන් වෙන් කර array එකක් ලෙස සාදයි

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ✅ Health Check Route
app.get('/', (_req, res) => {
    res.send('Yandy Home Furniture Backend is running!');
});

// ✅ Product Routes
app.use('/api/products', productRoutes);

// ✅ Global Error Handler
app.use(errorHandler);

// ✅ Server Startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
