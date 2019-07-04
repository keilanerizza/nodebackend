const Sequelize = require('sequelize');
const db = require('../config/database');
console.log(99999)
const Estudante = db.define('estudante', {
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

module.exports = Estudante;