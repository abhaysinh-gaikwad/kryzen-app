// config/db.js
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a connection pool
const sequelize = new Sequelize(`${process.env.DATABASE_URL}`);

async function connectToDB(){
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("connected to db");
    } catch (error) {
        console.log("unable to connect");
    }
}
connectToDB()
module.exports = sequelize;
