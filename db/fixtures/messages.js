
module.exports = [
        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 1,
                "data": `{
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "Hi! Nice to meet you.\\n\\nWhy are you interested in the Republican convention?",
                            "buttons": [
                                {
                                    "title": "I'll be in Cleveland",
                                    "type": "postback",
                                    "payload": "1:in-town"
                                },
                                {
                                    "title": "I'm a delegate",
                                    "type": "postback",
                                    "payload": "1:delegate"
                                },
                                {
                                    "title": "For another reason",
                                    "type": "postback",
                                    "payload": "1:other-reason"
                                }
                            ]
                        }
                    }
                }`
            }
        },
        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 2,
                "data": `{
                    "text": "Great, we'll be on the ground as well. We'll push updates your way and reach out with any questions we have."
                }`
            }
        },
        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 3,
                "data": `{
                    "text": "Sounds good, we'll push updates your way and reach out with any questions we have."
                }`
            }
        },
        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 4,
                "data": `{
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Oh? Are you:",
                        "buttons": [
                            {
                                "title":"Just interested",
                                "type":"postback",
                                "payload":"4:remote"
                            },
                            {
                                "title":"For another reason",
                                "type":"postback",
                                "payload":"4:other-reason"
                            }
                        ]
                    }
                }`
            }
        },
        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 5,
                "data": `{
                    "text": "Great, we'll push the latest your way"
                }`
            }
        },
        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 6,
                "data": `{
                    "text": "Heh, sorry about that, could you tell us why you're interested in your own words?"
                }`
            }
        },
        // {
        //     "model": "Message",
        //     "keys": ["id"],
        //     "data": {
        //         "id": ,
        //         "data": `{
                    
        //         }`
        //     }
        // },
    ];
