module.exports = (sequelize, type) => {
    return sequelize.define('customer', {
        idcustomer: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: type.STRING
        },
        lastname: {
            type: type.STRING
        },
        gender: {
            type: type.STRING
        },
        phonenumber: {
            type: type.STRING
        },
        address: {
            type: type.STRING
        },
        email: {
            type: type.STRING
        },
        username: {
            type: type.STRING
        },
        password: {
            type: type.STRING
        },
        nationality: {
            type: type.STRING
        },
        level: {
            type: type.ENUM('1','2'),
            defaultValue : '2'

        }
    }, {
        tableName: 'customer',
        timestamps: false
    })
}