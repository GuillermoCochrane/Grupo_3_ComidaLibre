module.exports = (sequelize, DataTypes) => {
  let alias = "SaleDetail";
  let cols = {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    sales_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    products_id: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.TINYINT(1),
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    discount: {
      type: DataTypes.TINYINT(3),
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  };
  let config = {
    tableName: "sales_details",
    timestamps: false,
  };

  const SaleDetails = sequelize.define(alias, cols, config);

  SaleDetails.associate = (models) => {
    SaleDetails.belongsTo(models.Product, {
      as: "saleDetail_product",
      foreignKey: "products_id",
    });

    SaleDetails.belongsTo(models.Sale, {
      as: "saleDetail_sale",
      foreignKey: "sales_id",
    });
  };

  return SaleDetails;
};