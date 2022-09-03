module.exports = (sequelize, dataTypes) => {
    let alias = "Favourites";
    let cols = {
        id: {
            type: dataTypes.INTEGER(4),
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.INTEGER(6),
            notNull: true
        },
        user_id: {
            type: dataTypes.INTEGER(6),
            notNull: true
        }
    };
    let config = {
        tableName: "favourites",
        timestamps: false
    };

    const Favourite = sequelize.define(alias, cols, config);
    
    Favourite.associate = function(models){
        Favourite.belongsTo(models.Products, {
            as: "favourite_product",
            foreignKey: "product_id"
        });

        Favourite.belongsTo(models.Users, {
            as: "favourite_user",
            foreignKey: "user_id"
        });
    };

    return Favourite;
}