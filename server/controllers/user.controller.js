const userService = require('../services/user.service');

exports.register = async (req, res, next) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            message: 'Usuário criado com sucesso!',
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        next(err);
    }
}