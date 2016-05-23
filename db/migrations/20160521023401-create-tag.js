'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Tags', {
            tag: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.STRING,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            messageId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Message',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('Tags');
    }
};
