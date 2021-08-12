const jwt = require('jsonwebtoken');

module.exports = {
  jwtSignPromise(payload, secret, options) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  jwtVerifyPromise(token, secret, options) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, options, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
  },
};
