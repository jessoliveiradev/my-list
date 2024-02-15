const express = require('express');
const mysql = require('mysql');
const config = require('./config');
const bodyParser = require('body-parser');
// const sequelize = require('./config/sequelize');
// const User = require('./models/user');

const app = express();
const port = 3000;

app.use(bodyParser.json());

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

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log('Tabelas criadas com sucesso');
//     // Agora que as tabelas foram criadas, adicione o novo usuário
//     return User.create({
//       firstName: 'John',
//       lastName: 'Doe',
//       role: 'user'
//     });
//   })
//   .then(usuario => {
//     console.log('Novo usuário criado:', usuario.toJSON());
//   })
//   .catch(erro => {
//     console.error('Erro ao criar usuário:', erro);
//   });

app.get('/', (req, res) => {
  res.send('Oi!');
});

const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

app.use('/users', userRoutes);
app.use(taskRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});