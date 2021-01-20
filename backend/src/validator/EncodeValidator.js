const { check } = require('express-validator');

module.exports = {
    validate: () => {
      return [
        check("toEncode", "Missing mandatory parameter => toEncode").not().isEmpty()
      ]
    },
  }