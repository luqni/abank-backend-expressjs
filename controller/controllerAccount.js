var response = require('../response/res');
var accountDao = require('../dao/accountDao');
var logger = require('winston'); 

exports.insertAccount = function(req, res){
    accountDao.insert(req.body, function(err, result){
        if(err){
          logger.error(err);
            response.err(err, res);
        }
        response.ok(result, res);
    });
}

exports.accounts = function(req, res){
    let whereClause = {};
    if(req.query.idcustomer){
        whereClause.idcustomer = req.query.idcustomer;
    }
    accountDao.getAll(whereClause,function(err, rows){
        if(err){
           logger.error(err);
            response.err(err,res);
        }else{
            
            response.ok(rows, res);
        }
    });
}

exports.getAccountById = function(req, res){
    accountDao.getById(req.params['id'], function(err, result){
        if(err){
            logger.error(error);
            response.err(err, res);
        }
        response.ok(result, res);
    });
}

exports.getAccountByIdCustomer = function(req, res){
    accountDao.getByIdCustomer(req.params['idcustomer'], function(err, result){
        if(err){
            logger.error(error);
            response.err(err, res);
        }
        response.ok(result, res);
    });
}

exports.updateAccount = function(req, res){
    const body = req.body;
    accountDao.getById(body.accountnumber, function(err, data){
        if(err){
            logger.error(err);
            response.err(err, res);
        }else if (data == null){
            logger.datanotfound('data not found',res);
            response.datanotfound('data not found !! ', res);
        }else{
            accountDao.update(body.accountnumber, body, function(error, result){
                if(error){
                   logger.error(err);
                    response.err(err, res);
                }
                response.ok('Update Successfully : '+result.accountnumber, res);
            });
        }
    });
}

exports.deleteAccount = function(req, res){
    accountDao.getById(req.params['id'], function(err, data){
        if(err){
            logger.error(err);
            response.err(err, res);
        }else if(data == null){
            logger.datanotfound('data not found',res);
            response.datanotfound('data not found !! ', res);
        }else{
            accountDao.deleted(req.params['id'],function(error, result){
                if(error){
                    logger.error(err);
                    response.err(err, res);
                }
                response.ok(result.affectedRows +' data has been deleted  ', res);
            });
        }
    });
}

exports.getTransByAcc = function(req, res){
    let whereClause = {};
    if(req.params['id']){
        whereClause.accountnumber = req.params['id'];
    }

    transactionDao.getAll(whereClause, function(err, rows){
        if(err){
           logger.error(err);
            response.err(err,res);
        }else{
            
            response.ok(rows, res);
        }
    });
}

exports.cekPinAccount = function(req, res){
    accountDao.cekpin(req.body['accountnumber'], req.body['pin'], function(err, rows){
        if(err){
            response.err(err, res);
        }else{
            response.ok(rows, res);
        }
    })
}