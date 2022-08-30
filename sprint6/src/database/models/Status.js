module.exports = (sequelize, dataTypes) => {
    let alias = "Statuses";
    let cols = {
        id: {
            type: dataTypes.INTEGER(6),
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: dataTypes.STRING(45),
            unique: true,
            notNull: true
        }
    };
    let config = {
        tableName: "statuses",
        timestamps: false
    };

    const Status = sequelize.define(alias, cols, config);

    return Status;
}