var response = require('../response/res');
var transactionDao = require('../dao/transactionDao');
var accountDao = require('../dao/accountDao');
var logger = require('winston'); 

exports.transactions = function(req, res){
    let whereClause = {};
    if(req.query.accountnumber){
        whereClause.accountnumber = req.query.accountnumber;
    }
    transactionDao.getAll(whereClause,function(err, rows){
        if(err){
            logger.error(err);
            response.err(err,res);
        }else{
            
            response.ok(rows, res);
        }
    });
}
exports.getTransactionById = function(req, res) {
    transactionDao.getById(req.params['id'], function(err, data){
        if(err){
            logger.error('error call getById : '+err);
            response.err(err, res);
        } 
        response.ok(data, res);
    });

};

exports.insertTransaction= function(req, res) {
    body = req.body;
    accountDao.getById(body.receiver, function(err, dataAccount){
        if(err){
            response.err(err,res);
        }else if(dataAccount == null){
            response.datanotfound('account receiver not found !', res);
        }else {
            accountDao.getById(body.account.accountnumber, function(err, accSender){
                if(err){
                    response.err(err,res);
                }else if(accSender == null){
                    response.datanotfound('account sender not found !', res);
                }
                else{
                    accountDao.debit(body.account.accountnumber, body.amount, function(error, result){
                        if(error){
                            response.err(error, res);
                        }else{
                            accountDao.credit(body.receiver, body.amount, function(err2, result2){
                                if(err2){
                                    response.err(err2, res);
                                }else{
                                    body.receivername = dataAccount.customer.firstname ;
                                    body.sender = accSender.accountnumber;
                                    body.sendername = accSender.customer.firstname;
                                    transactionDao.insert(body, function(err, data){
                                        if(err){
                                            console.log('error call insert : '+err);
                                            response.err(err, res);
                                        } 
                                        else{

                                            let transaction = body;
                                            transaction.amountsign ='C';
                                            transaction.account.accountnumber = body.receiver;                                           
                                            transaction.accountnumber = body.receiver;
                                            
                                        
                                            transactionDao.insert(transaction, function(err32, data){
                                                if(err32){
                                                    console.log('error call insert : '+err32);
                                                    response.err(err32, res);
                                                }else{

                                                    response.ok('successful transaction ', res);
                                                } 
                                                  
                                            
                                            });
                                            
                                        }
                                          
                                    
                                    });
                                   
                                }
                            })
                           
                        }
                    })
                }
            })
         
        }
    })
  
       
};

exports.updateTransaction = function(req, res) {
    transactionDao.getById(req.body.idtransaction, function(err, data){
        if(err){
            logger.error('error call getById : '+err)
            response.err(err, res);
        } else if(data==null){
            response.datanotfound('customer not found', res);
        }else{
            transactionDao.updateTransaction(req.body.idtransaction, req.body, function(err, data){
                if(err){
                    logger.error('error call update : '+err)
                    response.err(error, res);
                } 
                response.ok('updated data : '+ data.message, res);
            });
        }
    });
};

exports.del = function(req, res) {
    transactionDao.getById(req.params['id'], function(err, data){
        if(err){
            logger.error('error call getById : '+err)
            response.err(err, res);
        }  else if(data==null){
            response.datanotfound('transaction not found', res);
        }else{
            
            transactionDao.del(req.params['id'], function(err, data){
                if(err){ 
                    logger.error('error call delete : '+err)
                    response.err(error, res);
                } 
                response.ok(data, res);
            });
        }
    });
};

exports.historyCredit = function(req, res){
    transactionDao.historyCredit(req.params['in'], function(err, result){
        if(err){
            logger.error(err);
            response.err(err,res);
        }else if(result==null){
            response.datanotfound('history not found', res);
        }
        else{
            response.ok(result, res);
        }
    })
}

exports.historyLatest = function(req, res){
    transactionDao.historyLatest(req.params['io'], function(err, result){
        if(err){
            logger.error(err);
            response.err(err,res);
        }else if(result==null){
            response.datanotfound('history not found', res);
        }
        else{
            response.ok(result, res);
        }
    })
}

exports.historyDebit = function(req, res){
    transactionDao.historyDebit(req.params['out'], function(err, result){
        if(err){
            logger.error(err);
            response.err(err,res);
        }else if(result==null){
            response.datanotfound('history not found', res);
        }
        else{
            response.ok(result, res);
        }
    })
}
