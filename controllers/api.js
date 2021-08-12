const jwt = require('jsonwebtoken');

const config = require('../config.json');
const { jwtSignPromise } = require('../helpers');

// Use a proper store such as Redis or even set up a database to manage
// refresh tokens on production.
const tokenList = {};

module.exports = {
  index(req, res) {
    res.send('API endpoint root: OK');
  },
  secure(req, res) {
    const { decoded } = req;

    res.json({
      message: 'Welcome to the secret route...',
      decoded,
    });
  },
  async login(req, res) {
    const { email, name } = req.body;
    const user = { email, name };

    if (email === undefined || name === undefined) {
      res.json({
        success: false,
        message: 'Provide email and name as data.',
      });
    }

    const token = await jwtSignPromise(user, config.secret, {
      expiresIn: config.tokenLife,
    });
    const refreshToken = await jwtSignPromise(user, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenLife,
    });

    tokenList[refreshToken] = token;

    res.json({
      success: true,
      token,
      refreshToken,
    });
  },
  async refresh(req, res) {
    const { refreshToken, payload } = req.body;

    if (refreshToken === undefined || !tokenList.hasOwnProperty(refreshToken)) {
      return res.json({
        success: false,
        message: 'Please provide a valid refresh token.',
      });
    }

    const newToken = await jwtSignPromise(payload, config.secret, {
      expiresIn: config.tokenLife,
    });
    tokenList[refreshToken] = newToken;

    return res.json({
      success: true,
      token: newToken,
    });
  },
};
