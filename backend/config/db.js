// config/db.js
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a connection pool
const sequelize = new Sequelize("mysql://avnadmin:AVNS_fPSdjN3uJEzI2BDLT1e@mysql-2d9b1338-personal-finance-manangment.j.aivencloud.com:28649/kryzen?ssl-mode=REQUIRED");

async function connectToDB(){
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("connected to db");
    } catch (error) {
        console.log("unable to connect");
    }
}
module.exports =sequelize,connectToDB;
