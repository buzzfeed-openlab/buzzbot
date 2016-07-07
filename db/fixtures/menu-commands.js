
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
            "order": 2
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
]