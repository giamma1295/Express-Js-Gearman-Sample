const { check } = require('express-validator');

module.exports = {
    validate: () => {
      return [
        check("webhookUrl", "Missing mandatory parameter => webhookUrl").not().isEmpty()
      ]
    },
  }