module.exports = function(app){
    var controller = require('../controller/controllerAccount');

    app.route('/account').post(controller.insertAccount);
    app.route('/account/list').get(controller.accounts);
    app.route('/account/:id').get(controller.getAccountById);
    app.route('/accountbycust/:idcustomer').get(controller.getAccountByIdCustomer);
    app.route('/account').put(controller.updateAccount);
    app.route('/account/:id').delete(controller.deleteAccount);
    app.route('/account/:id/transaction').get(controller.getTransByAcc);
    app.route('/account/pin').post(controller.cekPinAccount);
    
}