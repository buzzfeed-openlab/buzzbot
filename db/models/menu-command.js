
export default (sequelize, DataTypes) => {
    var MenuCommand = sequelize.define('MenuCommand', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        data: {
            type: DataTypes.JSON,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        order: {
            type: DataTypes.INTEGER,
        }
    }, {
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return MenuCommand;
};
