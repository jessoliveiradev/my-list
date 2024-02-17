const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./config/sequelize');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

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

    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id }, 'secretkey');

    res.json({ token });
});

app.get('/protected', (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, 'secretkey');
    res.json(decoded);
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
});

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});