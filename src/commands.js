
import { Controller } from '../db';
import { sendMessagesSequentially } from './messenger-interface';

// const commands = {
//     'PAUSE': pauseForUser,
//     'STOP': pauseForUser,
//     'UNSUBSCRIBE': pauseForUser,
//     'QUIT': pauseForUser,
//     'STOP MESSAGING ME': pauseForUser,
//     'PLEASE STOP MESSAGING ME': pauseForUser,
//     'PLEASE STOP': pauseForUser,

//     'RESUME': resumeForUser,
//     'START': resumeForUser,

//     'WHAT\'S THE LATEST?': getTheLatest,
//     'WHATS THE LATEST?': getTheLatest,
//     'WHAT\'S THE LATEST': getTheLatest,
//     'WHATS THE LATEST': getTheLatest,
//     'UPDATE': getTheLatest,
//     'WHAT\'S UP?': getTheLatest,
//     'WHATS UP?': getTheLatest,
//     'WHAT\'S UP': getTheLatest,
//     'WHATS UP': getTheLatest,
//     'LATEST': getTheLatest,
//     'LATEST?': getTheLatest,

//     'SURPRISE': surpriseForUser,
//     'SURPRISE ME': surpriseForUser,
//     'SURPRISE!': surpriseForUser,
//     'SURPRISE ME!': surpriseForUser,
//     'SURPRISE ME': surpriseForUser,
//     'SUPRISE': surpriseForUser,
//     'SUPRISE ME': surpriseForUser,
//     'SUPRISE!': surpriseForUser,
//     'SUPRISE ME!': surpriseForUser,
// };

const commands = [
    {
        exp: /^(STOP|PAUSE|UNSUBSCRIBE|QUIT)/i,
        fn: pauseForUser
    },
    {
        exp: /^(RESUME|START)/i,
        fn: resumeForUser
    },
    {
        exp: /^(SURPRISE|SURPRISE ME)/i,
        fn: surpriseForUser
    },
    {
        exp: /^((OPEN(\s+)?LAB))/i,
        fn: triggerMessages.bind(undefined, [500, 501])
    },
    {
        exp: /^(NEWS(\s+)?LETTER)/i,
        fn: triggerMessages.bind(undefined, [502])
    },
    {
        exp: /(ABOUT(.*)?OPEN(\s+)?LAB)/i,
        fn: triggerMessages.bind(undefined, [503])
    },
    {
        exp: /^(MAP)/i,
        fn: triggerMessages.bind(undefined, [504])
    },
    {
        exp: /^(GE)/i,
        fn: triggerMessages.bind(undefined, [505])
    },
    {
        exp: /^(Saito(\s+)(Photo|Picture|Selfie))/i,
        fn: triggerMessages.bind(undefined, [601])
    },
    {
        exp: /^(Saito(\s+)Software)/i,
        fn: triggerMessages.bind(undefined, [602, 603])
    },
    {
        exp: /^(Saito)/i,
        fn: triggerMessages.bind(undefined, [600])
    },
    {
        exp: /^(Swale)/i,
        fn: triggerMessages.bind(undefined, [610, 611, 612])
    },
    {
        exp: /^(AEMP)/i,
        fn: triggerMessages.bind(undefined, [620, 621, 622])
    },
    {
        exp: /^(Ainsley(.*)Bio)/i,
        fn: triggerMessages.bind(undefined, [701, 702])
    },
    {
        exp: /^(Ainsley)/i,
        fn: triggerMessages.bind(undefined, [700])
    },
    {
        exp: /^(Glance)/i,
        fn: triggerMessages.bind(undefined, [710, 711])
    },
];

export default function getCommand(text) {
    for (var i = 0; i < commands.length; ++i) {
        let command = commands[i];

        if (command.exp.test(text)) {
            return command.fn;
        }
    }
}

function normalizeText(text) {
    return String(text).toUpperCase();
}

function pauseForUser(token, event, user) {
    Controller.updateUser(user.id, { state: 'paused' }).then((user) => {
        // the pause message has id 50
        Controller.getMessage(50).then((message) => {
            sendMessage(token, user.id, message);
        });
    });
}

function resumeForUser(token, event, user) {
    Controller.updateUser(user.id, { state: 'active' }).then((user) => {
        // the resume message has id 51
        Controller.getMessage(51).then((message) => {
            sendMessage(token, user.id, message);
        });
    });
}

function getTheLatest(token, event, user) {
    Controller.getMessage(53).then((message) => {
        sendMessage(token, user.id, message);
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
                Controller.getMessage(52).then((message) => {
                    sendMessage(token, user.id, message);
                });
            }
        });
    });
}

function triggerMessages(messageIds, token, event, user) {
    Controller.getMessages(messageIds).then((messages) => {
        sendMessagesSequentially(token, user.id, messages);
    });
}
