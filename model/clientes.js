const Sequelize = require('sequelize');
const db = require('../config/database');
console.log(99999)
const Cliente = db.define('cliente', {
    codigo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Cliente;