
export default (sequelize, DataTypes) => {
    var Tag = sequelize.define('Tag', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'messageTag',
        },
        messageId: {
            type: DataTypes.INTEGER,
            unique: 'messageTag'
        }
    }, {
        classMethods: {
            associate: function(models) {
                Tag.belongsToMany(models.User, {
                    through: 'UserTag',
                    foreignKey: 'tagId',
                    as: 'users'
                });
                Tag.belongsTo(models.Message, {
                    foreignKey: 'messageId'
                });
                Tag.hasMany(models.Response, {
                    as: 'Responses',
                    foreignKey: 'tagId'
                });
            }
        }
    });
    return Tag;
};
