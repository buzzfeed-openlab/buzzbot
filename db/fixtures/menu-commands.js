
module.exports = [
    {
        "model": "MenuCommand",
        "keys": ["id"],
        "data": {
            "id": 100,
            "data": `{
                "type": "web_url",
                "title": "View BuzzFeed News",
                "url": "https://www.buzzfeed.com/news"
            }`,
            "active": true,
            "order": 5
        }
    },
    {
        "model": "MenuCommand",
        "keys": ["id"],
        "data": {
            "id": 110,
            "data": `{
                "type": "postback",
                "title": "Stop",
                "payload": "command:stop"
            }`,
            "active": true,
            "order": 1
        }
    },
    {
        "model": "MenuCommand",
        "keys": ["id"],
        "data": {
            "id": 120,
            "data": `{
                "type": "postback",
                "title": "Surprise Me!",
                "payload": "command:surprise"
            }`,
            "active": true,
            "order": 2
        }
    },
]
