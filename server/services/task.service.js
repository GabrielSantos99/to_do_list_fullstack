const { PrismaClient, TaskStatus } = require('../generated/prisma');
const prisma = new PrismaClient();
const { z } = require('zod');

const taskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    status: z.enum(['Pending', 'InProgress', 'Done']).optional()
});

exports.getAllTasks = async () => {
    return await prisma.task.findMany({ orderBy: {createdAt: 'desc'} });
}

// CRUD de tarefas
exports.createTask = async (data) => {
    const validated = taskSchema.parse(data);
    return await prisma.task.create({ data: validated });
}

exports.updateTask = async (id, data) => {
    const validated = taskSchema.parse(data);
    return await prisma.task.update({
        where: { id: Number(id) },
        data: validated,
    });
}

exports.deleteTask = async (id) => {
    return await prisma.task.delete({
        where: {id: Number(id)},
    });
}

// Atalho para marcar como concluida a tarefa
exports.markAsDone = async (id) => {
    return await prisma.task.update({
        where: { id: Number(id) },
        data: { status: "Done" },
    })
}

exports.getStatusOptions = () => {
    return Object.values(TaskStatus);
}
