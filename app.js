const express = require('express');
const PORT = 3000;
const app = express();
const db = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({
    origin: ['http://localhost:4200'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Autorization"]
}));

app.use(bodyParser.json());

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

app.set("json spaces", 4);

const index = require('./routes/index');
const clientes = require('./routes/clientes');
const autores = require('./routes/autor');
const livros = require('./routes/livro');
const estudantes = require('./routes/estudante');

app.use('/', index);
app.use('/clientes', clientes);
app.use('/autores', autores);
app.use('/livros', livros);
app.use('/estudantes', estudantes);

app.listen(PORT, () => console.log('escutando na porta ' +PORT));