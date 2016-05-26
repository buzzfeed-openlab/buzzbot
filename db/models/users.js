
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate(models) {
                User.hasMany(models.Response, {
                    as: 'Responses',
                    foreignKey: 'userId'
                });
                User.belongsToMany(models.Tag, {
                    through: 'UserTag',
                    foreignKey: 'userId',
                    as: 'tags'
                });
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
