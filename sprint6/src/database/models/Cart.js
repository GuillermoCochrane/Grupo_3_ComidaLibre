module.exports = (sequelize, dataTypes) => {
    let alias = "Cart";
    let cols = {
        id: {
            type: dataTypes.INTEGER(6),
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
        },
        quantity: {
            type: dataTypes.TINYINT(2),
            notNull: true
        },
        subtotal: {
            type: dataTypes.DECIMAL(10,2),
            notNull: true
        }
    };
    let config = {
        tableName: "cart",
        timestamps: false
    };

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function(models){
        Cart.belongsTo(models.Products, {
            as: "cart_product",
            foreignKey: "product_id"
        });

        Cart.belongsTo(models.Users, {
            as: "cart_user",
            foreignKey: "user_id"
        });
    };

    return Cart;
}