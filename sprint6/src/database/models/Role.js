module.exports = (sequelize, dataTypes) => {
    let alias = "Roles";
    let cols = {
        id: {
            type: dataTypes.INTEGER(2),
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: dataTypes.STRING(45),
            unique: true,
            notNull: true
        }
    };
    let config = {
        tableName: "roles",
        timestamps: false
    };

    const Role = sequelize.define(alias, cols, config);

    Role.associate = function(models){
        Role.hasMany(models.Users, {
            as: "role_users",
            foreignKey: "role_id"
        });
    };

    return Role;
}