const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./Product");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER,  autoIncrement: true, primaryKey: true},
  username: {type: DataTypes.STRING,unique: true,allowNull: false},
  email: {type: DataTypes.STRING,unique: true,allowNull: false},
  password: {type: DataTypes.STRING,allowNull: false},
  isAdmin: {type: DataTypes.BOOLEAN,defaultValue: false},
});

User.belongsToMany(Product, { through: "UserProducts" });

module.exports = User;
