module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
        id: {
            type: dataTypes.INTEGER(6),
            primaryKey: true,
            autoIncrement: true
        },
        role_id: {
            type: dataTypes.INTEGER(2),
            notNull: true
        },
        first_name: {
            type: dataTypes.STRING(45),
            notNull: true
        },
        last_name: {
            type: dataTypes.STRING(45),
            notNull: true
        },
        address: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        email: {
            type: dataTypes.STRING(45),
            unique:true,
            notNull: true
        },
        phone: {
            type: dataTypes.STRING(45)
        },
        username: {
            type: dataTypes.STRING(45),
            unique: true,
            notNull: true
        },
        password: {
            type: dataTypes.STRING,
            notNull: true
        },
        image: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "users",
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    return User;
}