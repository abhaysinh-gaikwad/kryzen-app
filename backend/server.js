// server.js
const app = require('./app');
const connectToDB = require('./config/db');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    connectToDB;
  console.log(`Server is running on port ${port}`);
});

