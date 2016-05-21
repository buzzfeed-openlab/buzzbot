export default (sequelize, DataTypes) => {
    const Response = sequelize.define('Response', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: DataTypes.STRING,
        attachments: DataTypes.ARRAY(DataTypes.JSON),
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
