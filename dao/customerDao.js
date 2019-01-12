const { Customer, Account } = require('../db/con-sequelize');
var logger = require('winston');

exports.getById = function getById(id, callback) {
    Customer.findById(id)
    .then((customer) => {
        return callback(null, customer);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.getAll = function getAll(callback) {
    Customer.findAll()
    .then((customers) =>{
        return callback(null, customers);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.insert = function insert(data, callback) {
    Customer.create(data)
    .then(customer => {
        return callback(null, customer);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.register = function insert(data, callback) {
    Customer.findAll({
        where : {username : data.username}
    })
    .then((result)=>{
        if(result.length == 0){
            let account = data;
            Customer.create(account)
            .then( customer =>{
                account.idcustomer = customer.idcustomer;
                Account.create(account)
                .then( insertAccount =>{
                    return callback(null, insertAccount );
                }).catch((err)=>{
                    return callback(err);
                 })
            })
        } else{
           
                return callback('username has exist');
           
            
        }
    })

   
    
}

exports.update = function update(id, data, callback) {
    Customer.update(data, {
        where: { idcustomer: data.idcustomer },
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
    Customer.destroy({
        where: { idcustomer: id }
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

exports.login = function login(username, password, callback) {
    Customer.findAll({
        where: { username: username }
    })
    .then((result)=>{
        if (result.length > 0) {
            if (result[0].password == password) {
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
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
}
