const Tasks = require('../Models/tasks')

exports.addTask = async (req, res) => {
    console.log(req.body);
    const task = await Tasks.create(req.body);
    res.json(task)
}

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Tasks.find();
        res.json(tasks);
    } catch (error) {
        console.error('Failed to get tasks:', error);
        res.status(500).json({ message: 'Failed to get tasks' });
    }
};


exports.updateTask = async (req, res) => {
    const taskId = String(req.body.taskId);
    console.log("taskId", taskId)
    try {
        const updatedTask = await Tasks.findOneAndUpdate({ taskId: taskId }, { done: "true" });
        console.log("updatedTask", updatedTask)
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error('Failed to update task:', error);
        res.status(500).json({ message: 'Failed to update task' });
    }
};

exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteTask = await Tasks.findOneAndDelete({ taskId: id });
        if (!deleteTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Failed to delete task:', error);
        res.status(500).json({ message: 'Failed to delete task' });
    }
};


exports.getTaskByName = async (req, res) => {
    const { name } = req.params;
    console.log(name)
    try {
        const task = await Tasks.findOne({ name });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error('Failed to get task:', error);
        res.status(500).json({ message: 'Failed to get task' });
    }
};