const {Transaction, Account, Customer} = require('../db/con-sequelize');
var logger = require('../winston');


exports.getById = function getById(idtransaction, callback) {
    Transaction.findById(idtransaction)
    .then((transaction)=>{
        return callback(null, transaction);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
};

exports.getById = function getById(idtransaction, callback) {
    Transaction.findById(idtransaction)
    .then((transaction)=>{
        return callback(null, transaction);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
};

exports.historyCredit = function historyCredit(accountnumber, callback){
    Transaction.findAll({
        where : {accountnumber : accountnumber, amountsign : 'C'},
        order : [
            ['date', 'ASC']            
        ],
       limit : 50,
        include:{
            model : Account,
            include : {
                model : Customer
            }
        }
    })
    .then((history)=>{
        return callback(null, history);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}

exports.historyLatest = function historyLatest(accountnumber, callback){
    Transaction.findAll({
        where : {accountnumber : accountnumber},
        order : [
            ['date', 'ASC']            
        ],
        limit : 5,
        include:{
            model : Account,
            include : {
                model : Customer
            }
        }
    })
    .then((history)=>{
        return callback(null, history);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}
exports.historyDebit = function historyDebit(accountnumber, callback){
    Transaction.findAll({
        where : {accountnumber : accountnumber, amountsign : "D"},
        order : [
            ['date', 'ASC']            
        ],
        limit : 50,
        include:{
            model : Account,
            include : {
                model : Customer
            }
        }
    })
    .then((history)=>{
        return callback(null, history);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}

exports.getAll = function getAll(whereClause,callback) {
    Transaction.findAll({
        where : whereClause,
        include:{
            model : Account,
            include : {
                model : Customer
            }
        }
    })
    .then((transactions) => {
        return callback(null, transactions);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.insert = function insert(data, callback) {
   var transaction = data;
   console.log('masuk');
    if(transaction.account==null && transaction.accountnumber==null){
       console.log('masuk trx empty');
       
        callback('transaction empty');
    }else{
        if(transaction.accountnumber==null){
            transaction.accountnumber = transaction.account.accountnumber;
        }
    }

    Transaction.create(transaction)
    .then(transaction =>{
        
        return callback(null, transaction);
    })
    .catch((error)=>{
          console.log('logger error');

        logger.error(error);
        return callback(error);
    })
};

exports.updateTransaction = function updateTransaction(id, data, callback) {
  var  transaction = data;
    if(transaction.account==null && transaction.idtransaction==null){
        res.json('transaction is empty');
    }else{
        if(transaction.idtransaction==null){
            transaction.idtransaction = transaction.account.idcustomer;
        }
    }
    
    Transaction.update(data, {
        where: { idtransaction: data.idtransaction },
        returning: true,
        plain: true
      })
    .then(result => {
        logger.info('result  update:');
        logger.info(result);
        return callback(null, data);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};
exports.del = function del(id, callback) {
    Transaction.destroy({
        where: { idtransaction: id }
      })
    .then(result => {
        logger.info('result  update:');
        logger.info(result);
        return callback(null, id);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};