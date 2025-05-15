const { PrismaClient, TaskStatus } = require('../generated/prisma');
const prisma = new PrismaClient();
const { z } = require('zod');

const taskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    status: z.enum(['Pending', 'InProgress', 'Done']).optional()
});

const searchTermSchema = z.object({
    searchTerm: z.string().optional().default(''),
});

exports.getAllTasks = async (userId, query) => {
    const validated = searchTermSchema.parse(query);
    const { searchTerm } = validated;

    return await prisma.task.findMany({
        where: {
            userId,
            OR: [
                {title: {contains: searchTerm, mode: 'insensitive'}},
                {description: {contains: searchTerm, mode: 'insensitive'}},
            ]
        }},
        { orderBy: {createdAt: 'desc'} 
    });
};

// CRUD de tarefas
exports.createTask = async (data, userId) => {
    const validated = taskSchema.parse(data);
    return await prisma.task.create({
        data: {
            ...validated,
            userId,
        } 
    });
};

exports.updateTask = async (id, data, userId) => {
    const validated = taskSchema.parse(data);
    return await prisma.task.updateMany({
        where: {
            id: Number(id),
            userId,
        },
        data: validated,
    });
};

exports.deleteTask = async (id, userId) => {
    return await prisma.task.deleteMany({
        where: {
            id: Number(id),
            userId,
        },
    });
};

// Atalho para marcar como concluida a tarefa
exports.markAsDone = async (id, userId) => {
    return await prisma.task.update({
        where: {
            id: Number(id),
            userId,
        },
        data: { status: "Done" },
    })
};

exports.getStatusOptions = () => {
    return Object.values(TaskStatus);
};
