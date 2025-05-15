const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const taskRoutes = require('../routes/task.route');
const userRoutes = require('../routes/user.route');
const errorMiddleware = require('../middlewares/error.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddleware);

module.exports = app;
