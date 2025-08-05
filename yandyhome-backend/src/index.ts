// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// This is the corrected import path for the Prisma Client
import { PrismaClient } from './generated/prisma';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', async (_req, res) => {
    res.send('Yandy Home Furniture Backend is running!');
});

// Example Products route (Redux-friendly)
app.get('/api/products', async (_req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        // Add error handling to gracefully respond to database errors
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to retrieve products from the database.' });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
