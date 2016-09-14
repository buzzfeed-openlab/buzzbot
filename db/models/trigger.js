
export default (sequelize, DataTypes) => {
    var Trigger = sequelize.define('Trigger', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                Trigger.belongsTo(models.Tag, {
                    foreignKey: 'tagId'
                });
                Trigger.belongsTo(models.Message, {
                    as: 'triggerMessage',
                    foreignKey: 'triggerMessageId'
                });
                Trigger.belongsToMany(models.Message, {
                    through: 'MessageTrigger',
                    foreignKey: 'triggerId',
                    as: 'messages'
                });
            }
        }
    });
    return Trigger;
};
