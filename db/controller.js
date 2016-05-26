
export default (db) => {
    const controller = {
        getUser(id) {
            return db.User.findOne({ where: { id } });
        },

        getUsers(options = { where: {} }) {
            return db.User.findAll(options);
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
            return db.Message.create( { data: JSON.stringify(data) });
        },

        createMessageAndTags(data) {
            var tags = [];
            if (data.attachment && data.attachment.payload && data.attachment.payload.buttons) {
                var buttons = data.attachment.payload.buttons;
                for (var i = 0; i < buttons.length; ++i) {
                    tags.push(buttons[i].payload);
                }
            }

            return controller.createMessage(data).then((message) => {
                for (var i = 0; i < tags.length; ++i) {
                    controller.createTag(message.id, tags[i]);
                }

                return message;
            });
        },

        getMessage(id) {
            return db.Message.findOne({ where: { id } });
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

        createTrigger(tagId, messageIds) {
            return db.Trigger.create({
                tagId
            }).then((trigger) => {
                trigger.addMessages(messageIds);
                return trigger;
            });
        },

        getMessagesForTriggerFromTag(tag) {
            return db.Trigger.findOne({ where: {
                tagId: tag.id
            } });
        },

        getTag(messageId, tag) {
            return db.Tag.findOne({ where: {
                messageId,
                tag
            } });
        },

        createTag(messageId, tag) {
            return db.Tag.create({ messageId, tag });
        },

    }

    return controller;
}
