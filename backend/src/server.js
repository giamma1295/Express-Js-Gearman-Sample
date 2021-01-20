const dotenv = require("dotenv");
dotenv.config();
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.SERVER_PORT

app.use(bodyParser.json());

// Add Controllers
require('./controller/AuthController')(app)
require('./controller/EncodeController')(app)
require('./controller/WebhookController')(app)

async function startServer() {    
    app.listen(port, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Appilcation succesfully started, listening for request on port => ${port}`);
    });
  }

//Start Server
startServer();
