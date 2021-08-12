const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('./config.json');
const apiRoutes = require('./routes/api');

const app = express();
const port = config.port || process.env.PORT || 3000;

/* ========== Middlewares ========== */

app.use(express.json());

/* ========== Routes ========== */

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
