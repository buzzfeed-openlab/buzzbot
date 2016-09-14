
export default (sequelize, DataTypes) => {
    var Message = sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        data: DataTypes.JSON,
        metadata: {
            type: DataTypes.TEXT
        },
        unstructuredReply: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        initialMessage: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        surpriseMe: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        repeatable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        poll: {
            type: DataTypes.JSON
        }

    }, {
        classMethods: {
            associate: function(models) {
                Message.hasMany(models.Tag, {
                    as: 'Tags',
                    foreignKey: 'messageId'
                });
                Message.hasMany(models.Response, {
                    as: 'Responses',
                    foreignKey: 'messageId'
                });
                Message.belongsToMany(models.Trigger, {
                    through: 'MessageTrigger',
                    foreignKey: 'messageId',
                    as: 'triggers'
                });
            }
        }
    });
    return Message;
};
