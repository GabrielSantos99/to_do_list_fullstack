const taskService = require('../services/task.service')

exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await taskService.getAllTasks(req.user.id, req.query);
        res.json(tasks);
    } catch (err) {
        next(err);
    }
}

exports.createTask = async (req, res, next) => {
    try {
        const task = await taskService.createTask(req.body, req.user.id);
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
}

exports.updateTask = async (req, res, next) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body, req.user.id);
        res.json(task);
    } catch (err) {
        next(err);
    }
}

exports.deleteTask = async (req, res, next) => {
    try {
        await taskService.deleteTask(req.params.id, req.user.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

exports.markAsDone = async (req, res, next) => {
    try {
        const task = await taskService.markAsDone(req.params.id, req.user.id);
        res.json(task);
    } catch (err) {
        next(err);
    }
}

exports.getTaskStatuses = (req, res, next) => {
    try {
        const statuses = taskService.getStatusOptions();
        res.json(statuses);
    } catch (err) {
        next(err);
    }
}
