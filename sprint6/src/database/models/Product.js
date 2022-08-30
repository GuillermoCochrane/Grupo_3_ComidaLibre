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

    return Product;
}