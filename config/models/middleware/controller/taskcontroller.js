import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

export const addTask = async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ user: req.user._id, title, description });
  const createdTask = await task.save();
  res.status(201).json(createdTask);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: 'Not authorized' });

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.completed = req.body.completed ?? task.completed;

  const updatedTask = await task.save();
  res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: 'Not authorized' });

  await task.remove();
  res.json({ message: 'Task removed' });
};
