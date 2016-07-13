
import request from 'request';
import { Controller } from '../db';

import config from '../config.js';

export function sendMessage(token, recipient, message, cb) {
    var messageData = JSON.parse(message.data);

    // special case for template messages so that we have more info when we get
    // a postback from facebook
    if (messageData.attachment && messageData.attachment.payload && messageData.attachment.payload.buttons) {
        var buttons = messageData.attachment.payload.buttons;
        for (var i = 0; i < buttons.length; ++i) {
            buttons[i].payload = message.id + ':' + buttons[i].payload;
        }
    }

    return sendMessageData(token, recipient, message.id, messageData, message.repeatable, cb);
}

export function sendMessageData(token, recipient, messageId, messageData, repeatable, cb) {

    function internalSend() {
        request({
            url: config.baseFbUrl + '/me/messages',
            qs: { access_token: token },
            method: 'POST',
            json: {
                recipient: { id: recipient },
                message: messageData,
            }

        }, function(error, response, body) {
            if (error) {
                console.log('ERROR sending message: ', error);
            } else if (body && body.error) {
                console.log('ERROR: ', body.error);
            } else {
                console.log('INFO: send message response code', response.statusCode)
                // record that we sent the user this message
                Controller.createMessageEvent(recipient, messageId);
            }

            cb && cb(error, response, body);
        });
    }

    if (repeatable) {
        internalSend();

    } else {
        Controller.getMessageEventsForUserAndMessages(recipient, [ messageId ]).then((messageEvents) => {
            if (messageEvents.length) {
                return console.log('NOT SENDING because user: ' + recipient + ' has already received: ' + messageId);
            }

            internalSend();
        });
    }
}

export function sendMessagesSequentially(token, recipient, messages) {
    if (!messages.length) {
        return;
    }

    const message = messages.shift();

    sendMessage(
        token,
        recipient,
        message,
        sendMessagesSequentially.bind(null, token, recipient, messages)
    );
}

export function fetchUserInfo(token, userId, attemptsToMake = 5) {
    const userInfoUrl = `${config.baseFbUrl}/${userId}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${token}`

    request(userInfoUrl, function(err, response, body) {
        if (err) {
            console.log('ERROR fetching user info for ' + userId + ', attemptsRemaining ' + attemptsToMake + ': ', err);
            if (attemptsToMake >= 1) {
                fetchUserInfo(token, userId, attemptsToMake - 1);
            }
            return;
        }

        body = JSON.parse(body);

        const props = {
            firstName: body.first_name,
            lastName: body.last_name,
            profilePic: body.profile_pic,
            locale: body.locale,
            timezone: body.timezone,
            gender: body.gender
        };

        Controller.updateUser(userId, props);
    });
}

export function markSeen(token, userId) {
    request({
            url: config.baseFbUrl + '/me/messages',
            qs: { access_token: token },
            method: 'POST',
            json: {
                recipient: { id: userId },
                sender_action: 'mark_seen'
            }

        }, function(error, response, body) {
            if (error) {
                console.log('ERROR marking seen: ', error);
            } else if (body && body.error) {
                console.log('ERROR marking seen: ', body.error);
            } else {
                console.log('INFO: mark seen response code ', response.statusCode);
            }
        });
}

export function updatePersistentMenu(token) {
    Controller.getActiveMenuCommands().then((commands) => {
        // sort the commands acording to their order
        commands.sort((c1, c2) => {
            return c1.order - c2.order;
        });

        const callToActions = commands.map((c) => JSON.parse(c.data));

        request({
            url: config.baseFbUrl + '/me/thread_settings',
            qs: { access_token: token },
            method: 'POST',
            json: {
                setting_type: 'call_to_actions',
                thread_state: 'existing_thread',
                call_to_actions: callToActions
            }
        }, function(error, response, body) {
            if (error) {
                console.log('ERROR marking seen: ', error);
            } else if (body && body.error) {
                console.log('ERROR: ', body.error);
            }

            console.log(body);
        });
    });
}

export function turnOnGetStartedButton(token) {
    request({
        url: config.baseFbUrl + '/me/thread_settings',
        qs: { access_token: token },
        method: 'POST',
        json: {
            setting_type: 'call_to_actions',
            thread_state: 'new_thread',
            call_to_actions: [
                {
                    "payload":"command:get-started"
                }
            ]
        }
    }, function(error, response, body) {
        if (error) {
            console.log('ERROR turning on "get started" button: ', error);
        } else if (body && body.error) {
            console.log('ERROR: ', body.error);
        }

        console.log(body);
    });
}
