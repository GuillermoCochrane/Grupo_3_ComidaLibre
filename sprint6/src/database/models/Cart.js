module.exports = (sequelize, DataTypes) => {
    let alias = "Cart";
    let cols = {
      id: {
        type: DataTypes.INTEGER(4).UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      products_id: {
        type: DataTypes.INTEGER(6).UNSIGNED,
        allowNull: false,
      },
      users_id: {
        type: DataTypes.INTEGER(6).UNSIGNED,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.TINYINT(1),
        default: 1,
      },
    };
    let config = {
      tableName: "cart",
      timestamps: false,
    };
  
    const Cart = sequelize.define(alias, cols, config);
  
    Cart.associate = (models) => {
      Cart.belongsTo(models.Product, {
        as: "cart_product",
        foreignKey: "products_id",
      });
  
      Cart.belongsTo(models.User, {
        as: "cart_user",
        foreignKey: "users_id",
      });
    };
  
    return Cart;
  };