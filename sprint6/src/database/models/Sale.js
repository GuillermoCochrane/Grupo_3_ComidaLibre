module.exports = (sequelize, dataTypes) => {
    let alias = "Sales";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER(6),
            notNull: true
        },
        total: {
            type: dataTypes.DECIMAL(10,2),
            notNull: true
        }
    };
    let config = {
        tableName: "sales",
        timestamps: true
    };

    const Sale = sequelize.define(alias, cols, config);

    Sale.associate = function(models){
        Sale.belongsTo(models.Users, {
            as: "sale_user",
            foreignKey: "user_id"
        });

        Sale.hasMany(models.SaleDetails, {
            as: "sale_saleDetails",
            foreignKey: "sale_id"
        });
    };

    return Sale;
};