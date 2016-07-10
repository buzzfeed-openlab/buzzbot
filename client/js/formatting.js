
export function formatMessageInfo(messageId, messageText, messageMetadata, tag) {
    var formattedText = `${messageId}: ${messageText}`;

    if (messageMetadata) {
        formattedText += ` [${messageMetadata}]`;
    }

    if (tag) {
        formattedText += ` => ${tag}`;
    }

    return formattedText;
}

export function getMessageText(message) {
    var messageText = message.data.text;

    if (!messageText && message.data.attachment) {
        const attachment = message.data.attachment;

        if (attachment.type == 'template') {
            messageText = attachment.payload.text;
        } else if (attachment.type == 'image') {
            messageText = '<image>';
        } else if (attachment.type == 'video') {
            messageText = '<video>';
        } else {
            messageText = '<unknown content>';
        }
    } else if (!messageText) {
        messageText = '<unknown content>';
    }

    return messageText;
}
