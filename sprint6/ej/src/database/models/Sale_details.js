module.exports = (sequelize, DataTypes) => {
  let alias = "Sale_details";
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
    product_id: {
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
    tableName: "Sales_details",
    timestamps: false,
  };

  const Sale_details = sequelize.define(alias, cols, config);

  Sale_details.associate = (models) => {
    Sale_details.belongsTo(models.Product, {
      as: "sale_product",
      foreignKey: "product_id",
    });

    Sale_details.belongsTo(models.Sale, {
      as: "detail_sale",
      foreignKey: "sales_id",
    });
  };

  return Sale_details;
};
