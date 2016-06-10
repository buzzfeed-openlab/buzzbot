'use strict';

export default (sequelize, DataTypes) => {
    var MessageEvent = sequelize.define('MessageEvent', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                MessageEvent.belongsTo(models.Message, {
                    foreignKey: 'messageId'
                });
                MessageEvent.belongsTo(models.User, {
                    foreignKey: 'userId'
                });
            }
        }
    });

    return MessageEvent;
};
