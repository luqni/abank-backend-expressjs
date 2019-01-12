const {Account, Customer } = require('../db/con-sequelize');
var logger = require('winston'); 

exports.insert = function insert(data, callback){

    let account = data;
    if(account.customer==null && account.idcustomer==null){
        res.json('customer null');
    }else{
        if(account.idcustomer==null){
            account.idcustomer = account.customer.idcustomer;
        }
    }
    
    Account.create(account)
    .then(account=> {
        return callback(null, account);
    })
    .catch((error)=>{
        return callback(error)
    })
}

exports.getAll = function getAll(whereClause,callback) {
    Account.findAll({
        where : whereClause,
        include:[Customer]
    })
    .then((accounts) => {
        return callback(null, accounts);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.getById = function getById(id, callback){
    Account.findById(id, {
        include : Customer
    })
    .then(account=>{
        return callback (null, account);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}

exports.getByIdCustomer = function getById(idcustomer, callback){
    Account.findOne({
        where : {idcustomer : idcustomer},
        include : Customer
    })
    .then(account=>{
        return callback (null, account);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}

exports.update = function update(id, data, callback){
    Account.update(data,{
        where : {accountnumber : data.accountnumber},
        returning: true,
        plain: true
       
    })
    .then(account => {
        return callback(null, data)
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}

exports.deleted = function deleted (id, callback){
    Account.destroy({
        where : {accountnumber : id}
    })
    .then(result=>{
        logger.info(result);
        return callback(null, id) ;
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}


exports.cekSaldo = function cekSaldo(id, callback){
    this.getById(id, function(err, result){
        if(err){
            callback(err);
        } else {
            if (result)
                return callback(null, result.balance);
            else
                callback('account not found');
        }
        
    })
}

exports.debit = function debit(accountnumber, amount, callback){
    this.cekSaldo(accountnumber, function(err, result){
       if(err){
          callback(err);
       }else {
        if (result == amount){
            callback('Failed : Your must leaving your balance');
        }
         else if(result > amount){
               Account.update(
                   {balance : (result - amount )},
                   {where : { accountnumber : accountnumber } }
               )
               .then(account => {
                   return callback(null, result)
               })
               .catch((error)=>{
                   logger.error(error);
                   return callback(error);
               })

            }
            else{
                callback('your balance is insufficient');
            }
       }
   })
}

exports.credit = function credit(receiver, amount, callback){
    this.getById(receiver, function(err, result){
        if(err){
            callback(err);
        }else{
            if(result){
              
                Account.update(
                    {balance : (result.balance + parseInt(amount) )},
                    {where : { accountnumber : receiver } }
                )
                .then(account => {
                    return callback(null, result)
                })
                .catch((error)=>{
                    logger.error(error);
                    return callback(error);
                })

            }else{
                callback('account not found')
            }
        }
    })
}


exports.cekpin = function cekpin(accountnumber, pin, callback){
    Account.findAll({
        where : {accountnumber : accountnumber},
        include:{
            model : Customer 
        }
    })
    .then((result)=>{
        if (result.length > 0) {
            if (result[0].pin == pin) {
                    return callback(null, result);
                }else{
                    logger.error(error);
                    return callback(error);
                }
        }else{
            logger.error(error);
            return callback(error);
        }
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}
