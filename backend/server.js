const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Load environment variables
dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 4567;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API Endpoints
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// Register Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
