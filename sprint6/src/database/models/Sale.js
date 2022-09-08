module.exports = (sequelize, DataTypes) => {
  let alias = "Sale";
  let cols = {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      default: null,
    },
    updated_at: {
      type: DataTypes.DATE,
      default: null,
    },
    users_id: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(45),
      allowNull: false,
      default: "debit",
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  };
  let config = {
    tableName: "sales",
    timestamps: true,
    underscored: true,
  };

  const Sale = sequelize.define(alias, cols, config);

  Sale.associate = (models) => {
    Sale.hasMany(models.SaleDetail, {
      as: "sale_details",
      foreignKey: "sales_id",
    });

    Sale.belongsTo(models.User, {
      as: "sale_user",
      foreignKey: "users_id",
    });
  };

  return Sale;
};