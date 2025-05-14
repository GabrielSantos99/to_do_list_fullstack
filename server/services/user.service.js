const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const { z } = require('zod');
const { use } = require('../routes/user.route');

const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
});

const loginSchema = z.object({
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

exports.loginUser = async (data) => {
    const validated = loginSchema.parse(data);

    const user = await prisma.user.findUnique({
        where: { email: validated.email },
    });

    if (!user) {
        throw new Error('Credenciais inválidas');
    }

    const passwordMatch = await bcrypt.compare(validated.password, user.passwordHash);
    if (!passwordMatch) {
        throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token, user: { id: user.id, name: user.name, email: user.email } };
};
