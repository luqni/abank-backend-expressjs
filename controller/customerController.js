var response = require('../response/res');
var customerDao = require('../dao/customerDao');
var logger = require('../winston');

exports.customers = function(req, res){
    customerDao.getAll(function (error, rows){
        if(error){
            logger.error('error while select: '+error);
            response.err(error, res);
        } else{
            response.ok(rows, res)
        }
    });
};

exports.getCustomerById = function(req, res) {
    customerDao.getById(req.params['id'], function(err, data){
        if(err){
            logger.error('error call getById : '+err);
            response.err(err, res);
        } 
        response.ok(data, res);
    });
};

exports.updateCustomer = function(req, res) {
    logger.info('request for update :');
    logger.debug(req.body);
    customerDao.getById(req.body.idcustomer, function(err, data){//check customer exists
        if(err){
            logger.error('error call getById : '+err);
            response.err(err, res);
        } else if(data==null){
            response.datanotfound('customer not found', res);
        }else{
            //if exists, then continue update
            customerDao.update(req.body.idcustomer, req.body, function(err, data){
                if(err){
                    logger.error('error call update : '+err);
                    response.err(error, res);
                } 
                response.ok('updated data : '+ data.idcustomer, res);
            });
        }
    });
};

exports.insertCustomer= function(req, res) {
    logger.info('request for insert :');
    logger.debug(req.body);
    customerDao.insert(req.body, function(err, data){
        if(err){
            logger.error('error call insert : '+err);
            response.err(err, res);
        }
        response.ok('data inserted with id '+data.insertId, res);
    });
};

exports.registerData = function(req, res){
    customerDao.register(req.body,function(error, data){
        if (error) {
            logger.error(error);
            response.err(error, res);
        }
        response.ok(data,res);
    })
}

exports.del = function(req, res) {
    customerDao.getById(req.params['id'], function(err, data) {
        if(err){
            logger.error('error call getById : '+err);
            response.err(err, res);
        }  else if(data==null){
            response.datanotfound('customer not found', res);
        }else{
            //if exists, continue delete
            customerDao.del(req.params['id'], function(err, data){
                if(err){
                    logger.error('error call delete : '+err);
                    response.err(error, res);
                } 
                response.ok(data, res);
            });
        }
    });
};

exports.login = function(req, res){
    customerDao.login(req.body['username'], req.body['password'], function(err, rows){
        if(err){
            logger.error('Username or password wrong : '+err);
            response.err(err, res);
        }else{
            response.ok(rows, res);
        }
    })
}
