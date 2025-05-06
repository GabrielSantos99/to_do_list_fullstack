const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const taskRoutes = require('../routes/task.route');
const errorMiddleware = require('../middlewares/error.middleware')

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.use(errorMiddleware);

module.exports = app;
