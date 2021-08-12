const { jwtVerifyPromise } = require('../helpers');
const config = require('../config.json');

module.exports = {
  async verifyToken(req, res, next) {
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) return res.sendStatus(401);

    const [label, token] = bearerToken.split(' ');
    const decoded = await jwtVerifyPromise(token, config.secret).catch(
      (err) => {
        return res.json({
          success: false,
          message: err.message,
        });
      },
    );

    req.decoded = decoded;
    return next();
  },
};
