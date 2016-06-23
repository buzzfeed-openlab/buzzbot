
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

        updateUser(id, props) {
            return db.User.findOne({ where: { id } }).then((user) => {
                return user.update(props).then(() => {
                    return user;
                });
            });
        },

        getResponse(id) {
            return db.Response.findOne({ where: { id } });
        },

        getResponses(options = { where: {} }) {
            return db.Response.findAll(options);
        },

        createResponse(userId, data) {
            const props = Object.assign({}, data, { userId });

            return db.Response.create(props);
        },

        createMessage(data, unstructuredReply = false) {
            return db.Message.create({
                data: JSON.stringify(data),
                unstructuredReply: unstructuredReply
            });
        },

        createMessageAndTags(data, unstructuredReply = false) {
            var tags = [];
            if (data.attachment && data.attachment.payload && data.attachment.payload.buttons) {
                var buttons = data.attachment.payload.buttons;
                for (var i = 0; i < buttons.length; ++i) {
                    tags.push(buttons[i].payload);
                }
            }

            return controller.createMessage(data, unstructuredReply).then((message) => {
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
            if (messageIds && messageIds.length) {
                return db.Message.findAll({
                    where: {
                        id: {
                            $or: messageIds
                        }
                    }
                });
            }

            return db.Message.findAll({ where: {} });
        },

        getInitialMessages() {
            return db.Message.findAll({
                where: {
                    initialMessage: true
                }
            });
        },

        getOrCreateTrigger(tagId, messageIds) {
            return db.Trigger.findOrCreate({
                where: { tagId }
            }).spread((trigger) => {
                trigger.addMessages(messageIds);
                return trigger;
            });
        },

        getMessagesForTriggerFromTag(tag) {
            return db.Trigger.findOne({ where: {
                tagId: tag.id
            } }).then((trigger) => {
                if (trigger) {
                    return trigger.getMessages();
                }

                return [];
            });
        },

        getTag(options) {
            if (options.id) {
                return db.Tag.findOne({ where: {
                    id: options.id
                }});
            }

            return db.Tag.findOne({ where: {
                messageId: options.messageId,
                tag: options.tag
            } });
        },

        getTags() {
            return db.Tag.findAll( { where: {} });
        },

        createTag(messageId, tag) {
            return db.Tag.create({ messageId, tag });
        },

        createMessageEvent(userId, messageId) {
            return db.MessageEvent.create({
                userId,
                messageId
            });
        },

        getMessageEventsForUser(userId) {
            return db.MessageEvent.findAll({
                where: {
                    userId
                },
                order: '"createdAt" DESC',
                include: [db.Message]
            });
        },

    }

    return controller;
}
