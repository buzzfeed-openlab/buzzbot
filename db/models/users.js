
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        profilePic: {
            type: DataTypes.TEXT
        },
        locale: {
            type: DataTypes.STRING
        },
        timezone: {
            type: DataTypes.INTEGER
        },
        gender: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING,
            defaultValue: 'active'
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
