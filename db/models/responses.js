export default (sequelize, DataTypes) => {
    const Response = sequelize.define('Response', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: DataTypes.STRING,
        attachments: DataTypes.ARRAY(DataTypes.JSON),
    }, {
        classMethods: {
            associate(models) {
                Response.belongsTo(models.User, {
                    foreignKey: 'userId'
                });
                Response.belongsTo(models.Message, {
                    foreignKey: 'messageId'
                });
                Response.belongsTo(models.Tag, {
                    foreignKey: 'tag'
                });
            }
        }
    });

    return Response;
}
