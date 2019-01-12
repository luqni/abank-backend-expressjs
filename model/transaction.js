module.exports = (sequelize, type) => {
    return sequelize.define ('transacton',{
        idtransaction:{
            type:type.INTEGER,
            primaryKey:true,
        },
        receiver :{
            type : type.INTEGER
        },
        receivername :{
            type : type.STRING
        },
        sender :{
            type : type.STRING
        },
        sendername :{
            type : type.STRING
        },
        amount:{
           
            type:type.STRING
        },
        amountsign:{
           
            type:type.STRING
        },
        type:{
            
            type:type.STRING
        },
        date:{
           
            type:type.DATE
        },
        accountnumber:{
            type:type.INTEGER,
            onDelete:'CASCADE',
            references:{
                model:'account',
                key:'accountnumber'
            }
        }
    },{
        tableName:'transaction',
        timestamps:false
    })
}