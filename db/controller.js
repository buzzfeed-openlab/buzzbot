
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

    createMessage(data) {
        return db.Message.create( { data });
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

    getMessagesForTrigger(messageId, tag) {
        return db.Tag.findOne({ where: {
            messageId,
            tag,
        } }).then((tag) => {
            return db.Trigger.findOne({ where: {
                tagId: tag.id
            } }).then((trigger) => {
                return trigger ? trigger.getMessages() : [];
            });
        });
    }

}}
