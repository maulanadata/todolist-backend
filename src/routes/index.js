const express = require('express');
const router = express.Router();

const taskRoutes = require('./TaskRoutes');

router.use('/task', taskRoutes);


module.exports = router;
