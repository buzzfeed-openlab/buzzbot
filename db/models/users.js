
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    }, {
        timestamps: false,
        classMethods: {
            associate(models) {
            }
        },
        instanceMethods: {
            toJSON() {
                return {
                    id: this.id,
                };
            }
        }
    });

    return User;
};
