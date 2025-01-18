const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Example route
const exampleRoutes = require('./routes/exampleRoutes');
app.use('/example', exampleRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend Server!');
});

//connect to mongodb
const uri = "mongodb+srv://utchinese:hYk5xtnejQyeoMto@cluster0.a738i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


module.exports = app;
