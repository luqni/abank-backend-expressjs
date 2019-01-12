'use strict';

module.exports =function(app){
    var controller = require('../controller/customerController');
    
    app.route('/customer/list').get(controller.customers);
    app.route('/customer').post(controller.insertCustomer);
    app.route('/customer/:id').get(controller.getCustomerById);
    app.route('/customer').put(controller.updateCustomer);
    app.route('/customer/:id').delete(controller.del);
    app.route('/login').post(controller.login);
    app.route('/register').post(controller.registerData);
}