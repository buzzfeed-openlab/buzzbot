'use strict';
module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define('Tag', {
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                Tag.belongsToMany(models.User, {
                    through: 'UserTag',
                    foreignKey: 'tag',
                    as: 'users'
                });
                Tag.belongsTo(models.Message, {
                    foreignKey: 'messageId'
                });
                Tag.hasMany(models.Response, {
                    as: 'Responses',
                    foreignKey: 'tag'
                });
            }
        }
    });
    return Tag;
};
