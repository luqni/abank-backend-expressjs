module.exports = function(app){
    var controller = require('../controller/controllerTransaction');

    app.route('/transaction/list').get(controller.transactions);
    app.route('/transaction/:id').get(controller.getTransactionById);
    app.route('/transaction').post(controller.insertTransaction);
    app.route('/transaction').put(controller.updateTransaction);
    app.route('/transaction/:id').delete(controller.del);
    app.route('/transaction/historyCreadit/:in').get(controller.historyCredit);
    app.route('/transaction/historyDebit/:out').get(controller.historyDebit);
    app.route('/transaction/historyLatest/:io').get(controller.historyLatest);
    
}