module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER(6),
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: dataTypes.INTEGER(6),
            notNull: true
        },
        status_id: {
            type: dataTypes.INTEGER(6),
            notNull: true
        },
        name: {
            type: dataTypes.STRING(100),
            unique: true,
            notNull: true            
        },
        description: {
            type: dataTypes.STRING(500),
            notNull: true
        },
        price: {
            type: dataTypes.DECIMAL(10,2),
            notNull: true
        },
        image: {
            type: dataTypes.STRING
        },
        discount: {
            type: dataTypes.TINYINT(3),
            notNull: true
        }
    };
    let config = {
        tableName: "products",
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.Statuses, {
            as: "product_status",
            foreignKey: "status_id"
        });

        Product.belongsTo(models.Categories, {
            as: "product_category",
            foreignKey: "category_id"
        });

        Product.hasMany(models.Favourites, {
            as: "product_favourites",
            foreignKey: "product_id"
        });

        Product.hasMany(models.Cart, {
            as: "product_carts",
            foreignKey: "product_id"
        });

        Product.hasMany(models.SaleDetails, {
            as: "product_saleDetails",
            foreignKey: "product_id"
        });

    };

    return Product;
};