const express = require('express');
const Estudante = require('../model/estudante');
const router = express.Router();

router.get("/", (req, res) => {
    Estudante.findAll()
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        })
});

router.get("/:id", (req, res) => {
    Estudante.findOne({
        where: {
            codigo: req.params.id,
        }
    }).then(result => {
        if (result) {
            res.json(result);
        } else {
            res.sendStatus(404);
        }
    }).catch(error => {
        res.status(412).json({ msg: error.message });
    });
})

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/search/params', (req, res) => {
    var query = `%${req.query.nome}%`;

    console.log(query)
    Estudante.findAll({ where: { nome: { [Op.like]: query } } })
        .then(Estudantes => res.json(Estudantes))
        .catch(err => console.log(err));
});

router.delete("/:id", (req, res) => {
    Estudante.destroy({
        where: {
            codigo: req.params.id
        }
    })
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
});

router.post("/", (req, res) => {
    console.log(req.body);
    Estudante.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
});

router.put("/", (req,res) => {
    Estudante.update(req.body, {
        where: {
            codigo: req.body.codigo
        }
    })
    .then(result => res.sendStatus(204))
    .catch(error => {
        res.status(412).json({msg: error.message});
    });
});

module.exports = router;