// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
// const connectToDB = require('./config/db');

const app = express();

app.use(bodyParser.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Sync the database
// sequelize.sync().then(() => {
//   console.log('Database connected and synchronized');
// }).catch(err => {
//   console.error('Error syncing database:', err.message);
// });

module.exports = app;
