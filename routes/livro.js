const express = require('express');
const Livro = require('../model/livro');
const router = express.Router();

router.get("/", (req, res) => {
    Livro.findAll()
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        })
});

router.get("/:id", (req, res) => {
    Livro.findOne({
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
    Livro.findAll({ where: { nome: { [Op.like]: query } } })
        .then(Livros => res.json(Livros))
        .catch(err => console.log(err));
});

router.delete("/:id", (req, res) => {
    Livro.destroy({
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
    Livro.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
});

router.put("/", (req,res) => {
    Livro.update(req.body, {
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