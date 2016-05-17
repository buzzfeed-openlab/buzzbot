export default (sequelize, DataTypes) => {
    const Response = sequelize.define('Response', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: DataTypes.STRING,
        image: DataTypes.STRING,
        video: DataTypes.STRING,
        date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW')
        }
    }, {
        timestamps: false,
        classMethods: {
            associate(models) {
                Response.belongsTo(models.User, {
                    foreignKey: 'userId'
                });
            }
        }
    });

    return Response;
}
