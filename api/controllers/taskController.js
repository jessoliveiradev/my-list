const Task = require('../models/task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = await Task.create({ title, description, status });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if (!task) {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    console.error('Erro ao buscar tarefa por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar tarefa por ID' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    const task = await Task.findByPk(taskId);
    if (!task) {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    } else {
      task.title = title;
      task.description = description;
      task.status = status;
      await task.save();
      res.status(200).json(task);
    }
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if (!task) {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    } else {
      await task.destroy();
      res.status(204).end();
    }
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    res.status(500).json({ message: 'Erro ao excluir tarefa' });
  }
};
