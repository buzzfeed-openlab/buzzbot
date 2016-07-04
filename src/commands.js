
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

export default {
    PAUSE: pauseForUser,
    STOP: pauseForUser,

    RESUME: resumeForUser,
    START: resumeForUser
};
