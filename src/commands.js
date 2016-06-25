
import { sendMessage } from './send-message';

function pauseForUser() {

}

function resumeForUser() {

}

export default {
    'PAUSE': pauseForUser,
    'STOP': pauseForUser,

    'RESUME': resumeForUser,
    'START': resumeForUser
};
