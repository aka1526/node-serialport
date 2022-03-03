const sequelize = require("../config/db");
const { Sequelize, Model, DataTypes } = require("sequelize");

const Weight = sequelize.define("Weight", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_code: {
        type: DataTypes.STRING,
        //  allowNull: false
    },
    product_name: {
        type: DataTypes.STRING
            // allowNull defaults to true
    },
    mat_lot_no: {
        type: DataTypes.STRING
            // allowNull defaults to true
    },
    invoice_no: {
        type: DataTypes.STRING,
        // allowNull: true
        // allowNull defaults to true
    },
    total_weight: {
        type: DataTypes.INTEGER,
        //  allowNull: true
        // allowNull defaults to true
    },
    total_qty: {
        type: DataTypes.INTEGER,
        // allowNull: false
        // allowNull defaults to true
    },

    total_weight_qty: {
        type: DataTypes.INTEGER,
        //  allowNull: true
        // allowNull defaults to true
    },
    total_weight_diff: {
        type: DataTypes.INTEGER,
        //allowNull: true
        // allowNull defaults to true
    },
    total_box: {
        type: DataTypes.INTEGER,
        //allowNull: true
        // allowNull defaults to true
    },
    total_box_weight: {
        type: DataTypes.INTEGER,
        //allowNull: true
        // allowNull defaults to true
    }

});

//console.log(Weight === sequelize.models.Weight);

module.exports = Weight;