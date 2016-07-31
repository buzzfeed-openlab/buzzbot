
module.exports = [
    {
        "model": "Message",
        "keys": ["id"],
        "data": {
            "id": 50,
            "data": `{
                "text": "No problem! If you want to get in touch again, just say 'START' or 'RESUME'"
            }`,
            "unstructuredReply": true,
            "repeatable": true
        }
    },
    {
        "model": "Message",
        "keys": ["id"],
        "data": {
            "id": 51,
            "data": `{
                "text": "Good to hear from you again! Remember you can always say 'STOP' or 'PAUSE'"
            }`,
            "unstructuredReply": true,
            "repeatable": true
        }
    },
    {
        "model": "Message",
        "keys": ["id"],
        "data": {
            "id": 52,
            "data": `{
                "text": "Surprise, I'm out of surprises! :P\\n\\nBut check back later and maybe I'll have something new."
            }`,
            "unstructuredReply": true,
            "repeatable": true
        }
    },
    {
        "model": "Message",
        "keys": ["id"],
        "data": {
            "id": 53,
            "data": `{
                "text": "This post will stay up to date: https://www.buzzfeed.com/buzzfeednews/dnc-day-1 And you can always get the latest by following BuzzFeed News on Facebook and Twitter."
            }`,
            "unstructuredReply": true,
            "repeatable": true
        }
    },

    // -------

    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 110,
            data: `{
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Hi 👋 My name is BuzzBot.\\n\\nWhat would you like to see an example of?",
                        "buttons": [
                            {
                                "title": "text",
                                "type": "postback",
                                "payload": "wants-text"
                            },
                            {
                                "title": "gif",
                                "type": "postback",
                                "payload": "wants-gif"
                            },
                            {
                                "title": "poll",
                                "type": "postback",
                                "payload": "wants-poll"
                            }
                        ]
                    }
                }
            }`,
            initialMessage: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 120,
            data: `{
                "text": "This message is marked 'unstructuredReply: true'. You can write back using text, emoji, gifs, video, etc. You can even send multiple replies and they'll end up together."
            }`,
            unstructuredReply: true,
            metadata: "wants-text"
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 130,
            data: `{
                "attachment": {
                    "type": "image",
                    "payload":{
                        "url":"https://img.buzzfeed.com/buzzfeed-static/static/2014-07/18/8/enhanced/webdr09/anigif_enhanced-buzz-32587-1405685331-4.gif"
                    }
                }
            }`,
            metadata: "puppy-gif,wants-gif"
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 140,
            data: `{
                "text": "Tell me how you feel about puppies using emoji! Though you can use text to. Only the first response by a user is counted towards the poll. The other responses are recorded but not shown, so you can't sway the poll by sending a million poop emoji."
            }`,
            unstructuredReply: true,
            poll: "{}",
            metadata: "wants-poll",
            repeatable: true
        }
    }

]
