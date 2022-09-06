module.exports = (sequelize, DataTypes) => {
  let alias = "Product";
  let cols = {
    id: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      defaultValue: "default.png",
    },
    description: {
      type: DataTypes.TEXT(500),
    },
    discount: {
      type: DataTypes.TINYINT(3),
    },
    category_id: {
      type: DataTypes.INTEGER(6).UNSIGNED,
    },
    status_id: {
      type: DataTypes.INTEGER(6).UNSIGNED,
    },
  };
  let config = {
    tableName: "product",
    timestamps: false,
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      as: "product_category",
      foreignKey: "category_id",
    });

    Product.belongsTo(models.Status, {
      as: "product_status",
      foreignKey: "status_id",
    });

    Product.belongsToMany(models.User, {
      as: "products_users",
      through: "favourites",
      foreignKey: "product_id",
      otherKey: "user_id",
      timestamps: false,
    });

    Product.belongsToMany(models.User, {
      as: "products_cart",
      through: "cart",
      foreignKey: "product_id",
      otherKey: "user_id",
      timestamps: false,
    });
  };

  return Product;
};
