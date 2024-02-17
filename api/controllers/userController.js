const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, role, email, password } = req.body;
    const newUser = await User.create({ firstName, lastName, role, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar usuário por ID' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, role } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      user.firstName = firstName;
      user.lastName = lastName;
      user.role = role;
      await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      await user.destroy();
      res.status(204).end();
    }
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
};
