
export default (db) => { return {
    getUser(id) {
        return db.User.findOne({ where: { id: id } });
    },

    createUser(id) {
        return db.User.create({ id });
    },

    getOrCreateUser(id) {
        return db.User.findOrCreate({ where: { id } });
    },

    createResponse(userId, data) {
        const props = Object.assign({}, data, { userId });

        return db.Response.create(props);
    },

    getAllResponses(options) {
        return db.Response.findAll(options);
    },

    getMessages(messageIds) {
        return db.Message.findAll({
            where: {
                id: {
                    $or: messageIds
                }
            }
        });
    },

}}
