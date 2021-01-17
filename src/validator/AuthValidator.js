const { check } = require('express-validator');

module.exports = {
    validate: () => {
      return [
        check("username", "Missing mandatory parameter => username ").not().isEmpty(),
        check("password", "Missing mandatory parameter => password").not().isEmpty(),
      ]
    },
  }