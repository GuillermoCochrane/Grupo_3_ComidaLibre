module.exports = (sequelize, DataTypes) => {
    let alias = "Status";
    let cols = {
      id: {
        type: DataTypes.INTEGER(6).UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(45),
        unique: true,
      },
    };
    let config = {
      tableName: "statuses",
      timestamps: false,
    };
  
    const Status = sequelize.define(alias, cols, config);
  
    Status.associate = (models) => {
      Status.hasMany(models.Product, {
        as: "status_products",
        foreignKey: "statuses_id",
      });
    };
  
    return Status;
  };
  