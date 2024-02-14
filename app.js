const express = require('express');
const mysql = require('mysql');
const config = require('./config');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados!');
});

app.get('/', (req, res) => {
  res.send('Oi!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});