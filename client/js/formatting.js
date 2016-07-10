
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
