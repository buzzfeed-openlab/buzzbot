'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'Responses', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                text: Sequelize.STRING,
                attachments: Sequelize.ARRAY(Sequelize.JSON),
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
                tag: {
                    type: Sequelize.STRING,
                    references: {
                        model: 'Tag',
                        key: 'tag'
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
            }
        );
    },

    down(queryInterface) {
        return queryInterface.dropTable('Responses');
    }
};
