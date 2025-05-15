const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeadler = req.headers['authorization'];

    if (!authHeadler || !authHeadler.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido.'});
    }

    const token = authHeadler.split(' ')[1];
    console.log(token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado', err });
    }
}
