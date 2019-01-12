let accountnum = Math.floor(Math.random() * Math.random(10000000));
module.exports = (sequelize, type) => {
    return sequelize.define('account', {
        accountnumber : {
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            defaultValue : accountnum
        },
        pin : {
            type : type.STRING,
        },
        balance : {
            type : type.STRING
        },
        codebank : {
            type : type.STRING
        },
        date : {
            type : type.DATE
        },
        status : {
            type : type.ENUM('active', 'inactive','idle'),
            defaultValue : 'idle'
        },
        idcustomer : {
            type : type.INTEGER,
            ononDelete : 'CASCADE',
            references :{
                model : 'customer',
                key : 'idcustomer'
            }
        }
    }, {
        tableName : 'account',
        timestamps : false
    })
}