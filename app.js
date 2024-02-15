const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./api/config/sequelize');
const userRoutes = require('./api/routes/users');
const taskRoutes = require('./api/routes/tasks');

const app = express();
const port = 3000;

app.use(bodyParser.json());

sequelize.sync({ force: true })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso');
  })
  .catch(err => {
    console.error('Erro ao sincronizar tabelas:', err);
  });

app.get('/', (req, res) => {
  res.send('Oi!');
});

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});