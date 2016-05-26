'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'Users', {
                id: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    primaryKey: true
                },
                name: {
                    type: Sequelize.STRING
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            }
        );
    },

    down(queryInterface) {
        return queryInterface.dropTable('Users');
    }
};
