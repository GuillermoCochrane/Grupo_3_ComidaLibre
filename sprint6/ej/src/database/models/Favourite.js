module.exports = (sequelize, DataTypes) => {
  let alias = "Favourite";
  let cols = {
    id: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      allowNull: false,
    },
  };
  let config = {
    tableName: "favourites",
    timestamps: false,
  };

  const Favourite = sequelize.define(alias, cols, config);

  Favourite.associate = (models) => {
    Favourite.belongsTo(models.Product, {
      as: "fav_product",
      foreignKey: "product_id",
    });

    Favourite.belongsTo(models.User, {
      as: "fav_user",
      foreignKey: "user_id",
    });
  };

  return Favourite;
};
