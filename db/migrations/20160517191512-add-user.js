'use strict';

module.exports = {
    up(queryInterface, DataTypes) {
        return queryInterface.createTable(
            'Users', {
                id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    primaryKey: true
                }
            }
        );
    },

    down(queryInterface) {
        return queryInterface.dropTable('Users');
    }
};
