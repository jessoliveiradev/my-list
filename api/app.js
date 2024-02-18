const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/user');

const sequelize = require('./config/sequelize');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const config = require('./config');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso');
  })
  .catch(err => {
    console.error('Erro ao sincronizar tabelas:', err);
  });

app.get('/', (req, res) => {
  res.send('Oi!');
});

app.post('/login', 
  body('email').isEmail(),
  body('password').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      const token = jwt.sign({ id: user.id }, config.jwtSecret);
      res.json({ token });
    } catch (err) {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});