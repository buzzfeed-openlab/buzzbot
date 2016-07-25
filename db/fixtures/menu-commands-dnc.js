
module.exports = [
    {
        "model": "MenuCommand",
        "keys": ["id"],
        "data": {
            "id": 53,
            "data": `{
                "type": "web_url",
                "title": "Get the latest",
                "url": "https://www.buzzfeed.com/buzzfeednews/dnc-day-1"
            }`,
            "active": true,
            "order": 2
        }
    },
    {
        "model": "MenuCommand",
        "keys": ["id"],
        "data": {
            "id": 50,
            "data": `{
                "type": "web_url",
                "title": "BuzzFeed News",
                "url": "https://www.buzzfeed.com/news"
            }`,
            "active": true,
            "order": 3
        }
    },
    {
        "model": "MenuCommand",
        "keys": ["id"],
        "data": {
            "id": 51,
            "data": `{
                "type": "postback",
                "title": "Stop messaging me",
                "payload": "command:stop"
            }`,
            "active": true,
            "order": 5
        }
    },
    {
        "model": "MenuCommand",
        "keys": ["id"],
        "data": {
            "id": 52,
            "data": `{
                "type": "postback",
                "title": "Surprise me!",
                "payload": "command:surprise"
            }`,
            "active": true,
            "order": 1
        }
    },

]
