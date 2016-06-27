
import request from 'request';
import { Controller } from '../db';

export function sendMessage(token, recipient, message) {
    var messageData = JSON.parse(message.data);

    // special case for template messages so that we have more info when we get
    // a postback from facebook
    if (messageData.attachment && messageData.attachment.payload && messageData.attachment.payload.buttons) {
        var buttons = messageData.attachment.payload.buttons;
        for (var i = 0; i < buttons.length; ++i) {
            buttons[i].payload = message.id + ':' + buttons[i].payload;
        }
    }

    return sendMessageData(token, recipient, message.id, messageData);
}

export function sendMessageData(token, recipient, messageId, messageData) {
    Controller.getMessageEventsForUserAndMessage(recipient, messageId).then((messageEvents) => {
        if (messageEvents.length) {
            return console.log('NOT SENDING because user: ' + recipient + ' has already received: ' + messageId);
        }

        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token:token },
            method: 'POST',
            json: {
                recipient: { id:recipient },
                message: messageData,
            }

        }, function(error, response, body) {
            if (error) {
                console.log('ERROR: sending message: ', error);
            } else if (response.body.error) {
                console.log('ERROR: ', response.body.error);
            }

            // record that we sent the user this message
            Controller.createMessageEvent(recipient, messageId);
        });
    });
}
