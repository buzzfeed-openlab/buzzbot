'use strict';
module.exports = function(sequelize, DataTypes) {
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
                    foreignKey: 'id'
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
