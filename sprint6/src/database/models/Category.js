module.exports = (sequelize, dataTypes) => {
    let alias = "Categories";
    let cols = {
        id: {
            type: dataTypes.INTEGER(6),
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: dataTypes.STRING(45),
            unique: true,
            notNull: true
        }
    };
    let config = {
        tableName: "categories",
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models){
        Category.hasMany(models.Products, {
            as: "category_products",
            foreignKey: "category_id"
        });
    };

    return Category;
};