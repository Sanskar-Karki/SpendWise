const { DataTypes } = require("sequelize");
const sequelize = require("../connection/dbConnection");

const User = sequelize.define("User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      validate: {
        isconfirmed(value) {
          if (this.password && value != this.password) {
            throw new Error("Password do not match.")
          }
        }
      }
    }
  },
  {
    timestamps: true,
  }
);

module.exports = User;
