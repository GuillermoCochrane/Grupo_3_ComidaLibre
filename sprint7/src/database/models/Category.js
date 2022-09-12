module.exports = (sequelize, DataTypes) => {
  let alias = "Category";
  let cols = {
    id: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(45),
      unique: true,
    },
  };
  let config = {
    tableName: "categories",
    timestamps: false,
  };

  const Category = sequelize.define(alias, cols, config);

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      as: "category_products",
      foreignKey: "categories_id",
    });
  };

  return Category;
};
