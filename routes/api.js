const express = require('express');

const controller = require('../controllers/api');
const middlewares = require('../middlewares');

const router = express.Router();

/* ========== Routes ========== */

router.get('/', controller.index);

router.get('/secure', middlewares.verifyToken, controller.secure);

router.post('/login', controller.login);

router.post('/refresh', controller.refresh);

module.exports = router;
