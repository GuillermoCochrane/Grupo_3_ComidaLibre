module.exports = (sequelize, DataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING(255),
      defaultValue: "default.png",
    },
    first_name: {
      type: DataTypes.STRING(45),
    },
    last_name: {
      type: DataTypes.STRING(45),
    },
    address: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(45),
    },
    role_id: {
      type: DataTypes.INTEGER(2).UNSIGNED,
    },
  };
  let config = {
    tableName: "user",
    timestamps: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = (models) => {
    User.belongsTo(models.Role, {
      as: "user_role",
      foreignKey: "role_id",
    });

    User.belongsToMany(models.Product, {
      as: "users_products",
      through: "favourites",
      foreignKey: "user_id",
      otherKey: "product_id",
      timestamps: false,
    });

    User.belongsToMany(models.Product, {
      as: "users_cart",
      through: "cart",
      foreignKey: "user_id",
      otherKey: "product_id",
      timestamps: false,
    });
  };

  return User;
};
