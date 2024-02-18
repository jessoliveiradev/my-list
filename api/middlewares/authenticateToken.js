const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  const replacedToken = token.replace('Bearer ', '');

  jwt.verify(replacedToken, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Falha na autenticação do token.' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
