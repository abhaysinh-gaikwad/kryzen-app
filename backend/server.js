
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const port = process.env.PORT || 5000;


const app = express();

app.use(bodyParser.json(),cors());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

