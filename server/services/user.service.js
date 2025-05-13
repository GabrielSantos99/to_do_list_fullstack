const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const { z } = require('zod');

const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
});

exports.registerUser = async (data) => {
    const validated = userSchema.parse(data);

    const existingUser = await prisma.user.findUnique({
        where: { email: validated.email },
    });

    if (existingUser) {
        throw new Error('Email já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    return await prisma.user.create({
        data: {
            name: validated.name,
            email: validated.email,
            passwordHash: hashedPassword,
        },
    });
};

