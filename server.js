var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

var morgan = require('morgan');
var logger = require("./winston");
app.use(morgan('combined', { "stream": logger.stream }));
logger.debug("Overriding 'Express' logger");

//router for transaction
var transactionRoute = require('./routes/routesTransaction');
transactionRoute(app);
var accountRoute = require('./routes/routerAccount');
accountRoute(app);
var customerRoute = require('./routes/routesCustomer');
customerRoute(app);

app.listen(port);

logger.info('RESTful API server started on: ' + port);

