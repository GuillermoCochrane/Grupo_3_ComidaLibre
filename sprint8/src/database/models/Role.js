module.exports = (sequelize, DataTypes) => {
  let alias = "Role";
  let cols = {
    id: {
      type: DataTypes.INTEGER(6).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(45),
      unique: true,
    },
  };
  let config = {
    tableName: "roles",
    timestamps: false,
  };

  const Role = sequelize.define(alias, cols, config);

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      as: "role_users",
      foreignKey: "roles_id",
    });
  };

  return Role;
};
  