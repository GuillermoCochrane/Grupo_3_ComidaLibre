module.exports = (sequelize, dataTypes) => {
    let alias = "SaleDetails";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        sale_id: {
            type: dataTypes.INTEGER(10),
            notNull: true
        },
        product_id: {
            type: dataTypes.INTEGER(6),
            notNull: true
        },
        quantity: {
            type: dataTypes.TINYINT(2),
            notNull: true
        },
        subtotal: {
            type: dataTypes.DECIMAL(10,2),
            notNull: true
        }
    };
    let config = {
        tableName: "sale_details",
        timestamps: false
    };

    const SaleDetail = sequelize.define(alias, cols, config);

    return SaleDetail;
}