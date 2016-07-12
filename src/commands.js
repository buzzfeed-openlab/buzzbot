
import { Controller } from '../db';
import { sendMessage } from './messenger-interface';

function pauseForUser(token, event, user) {
    Controller.updateUser(user.id, { state: 'paused' }).then((user) => {
        // the pause message has id 200
        Controller.getMessage(200).then((message) => {
            sendMessage(token, user.id, message);
        });
    });
}

function resumeForUser(token, event, user) {
    Controller.updateUser(user.id, { state: 'active' }).then((user) => {
        // the resume message has id 201
        Controller.getMessage(201).then((message) => {
            sendMessage(token, user.id, message);
        });
    });
}

function surpriseForUser(token, event, user) {
    Controller.getAllSurpriseMeMessages().then((messages) => {
        var messageIds = messages.map((m) => m.id);

        Controller.getMessageEventsForUserAndMessages(user.id, messageIds).then((messageEvents) => {
            const messageEventIds = new Set(messageEvents.map((m) => m.messageId));

            // filter messages so that it doesn't contain ones the user has seen
            messages = messages.filter((message) => !messageEventIds.has(message.id));

            if (messages.length) {
                // pick any of these messages to send
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                sendMessage(token, user.id, randomMessage);

            } else {
                Controller.getMessage(210).then((message) => {
                    sendMessage(token, user.id, message);
                });
            }
        });
    });
}

export default {
    PAUSE: pauseForUser,
    STOP: pauseForUser,

    RESUME: resumeForUser,
    START: resumeForUser,

    'SURPRISE': surpriseForUser,
    'SURPRISE ME': surpriseForUser,
    'SURPRISE!': surpriseForUser,
    'SURPRISE ME!': surpriseForUser,
    'SURPRISE ME': surpriseForUser,
    'SUPRISE': surpriseForUser,
    'SUPRISE ME': surpriseForUser,
    'SUPRISE!': surpriseForUser,
    'SUPRISE ME!': surpriseForUser,
};
