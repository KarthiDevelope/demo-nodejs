// Import modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, MONGO_URL } from './config.js'; 
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/bookRoutes.js'
import userRoutes from './routes/users.js'

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/books', bookRoutes);

// Default route
app.get('/', (req, res) => {
    return res.status(200).send('Welcome to the Demo Node');
});

// Connect to MongoDB and start server
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("App is connected to the database");
        app.listen(PORT, () => {
            console.log(`App is running on PORT: ${PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });
