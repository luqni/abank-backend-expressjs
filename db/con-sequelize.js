const Sequelize = require('sequelize');

// const CustomerModel  = require('../model/customer');
const TransactionModel = require('../model/transaction');
const CustomerModel  = require('../model/customer');
const AccountModel  = require('../model/account');

const sequelize = new Sequelize('abank', 'root', '',{
    host : 'localhost',
    dialect : 'mysql',
    operatorsAliases: false,

    pool : {
        max : 10, 
        min : 0,
        acquire : 30000,
        idle : 10000
    }
}) 



// const Customer = CustomerModel(sequelize, Sequelize);
const Customer = CustomerModel(sequelize, Sequelize);
const Account = AccountModel(sequelize, Sequelize);
Account.belongsTo(Customer,  {foreignKey : 'idcustomer'})
const Transaction = TransactionModel (sequelize, Sequelize);
Transaction.belongsTo(Account, {
    foreignKey:'accountnumber', targetKey:'accountnumber'
});

module.exports = {
    Customer,
    Account,
    Transaction
}