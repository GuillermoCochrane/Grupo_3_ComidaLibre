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

    User.associate = function(models){
        User.hasMany(models.Favourites, {
            as: "user_favourites",
            foreignKey: "user_id"
        });

        User.hasMany(models.Cart, {
            as: "user_carts",
            foreignKey: "user_id"
        });

        User.hasMany(models.Sales, {
            as: "user_sales",
            foreignKey: "user_id"
        });

        User.belongsTo(models.Roles, {
            as: "user_role",
            foreignKey: "role_id"
        });
    }

    return User;
}