
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
                            "text": "Hi there! We’ve finally reached the moment everyone’s been waiting for. Are you at the Convention today?",
                            "buttons": [
                                {
                                    "title": "Yes!",
                                    "type": "postback",
                                    "payload": "at-convention"
                                },
                                {
                                    "title": "No, but I'm watching",
                                    "type": "postback",
                                    "payload": "not-at-convention"
                                }
                            ]
                        }
                    }
                }`,
                initialMessage: true
            }
        },

        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 2,
                "data": `{
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "What are you doing at the Convention?",
                            "buttons": [
                                {
                                    "title":"Protesting",
                                    "type":"postback",
                                    "payload":"protesting"
                                },
                                {
                                    "title":"Attending",
                                    "type":"postback",
                                    "payload":"attending"
                                },
                                {
                                    "title":"Reporting",
                                    "type":"postback",
                                    "payload":"reporting"
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
                "id": 3,
                "data": `{
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "Cool! What would you like to know more about?",
                            "buttons": [
                                {
                                    "title":"Can Trump be ousted?",
                                    "type":"postback",
                                    "payload":"can-trump-be-ousted?"
                                },
                                {
                                    "title":"What's the schedule?",
                                    "type":"postback",
                                    "payload":"whats-the-schedule?"
                                },
                                {
                                    "title":"Are there arrests?",
                                    "type":"postback",
                                    "payload":"are-there-arrests?"
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
                "id": 4,
                "data": `{
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "Would you be willing to send us photos from the scene?",
                            "buttons": [
                                {
                                    "title":"Yes",
                                    "type":"postback",
                                    "payload":"protester-might-send-photos"
                                },
                                {
                                    "title":"No",
                                    "type":"postback",
                                    "payload":"protester-will-not-send-photos"
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
                "id": 5,
                "data": `{
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "Would you be willing to send us photos from the scene?",
                            "buttons": [
                                {
                                    "title":"Yes",
                                    "type":"postback",
                                    "payload":"attendee-might-send-photos"
                                },
                                {
                                    "title":"No",
                                    "type":"postback",
                                    "payload":"attendee-will-not-send-photos"
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
                "id": 6,
                "data": `{
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "Have you been denied access from any events?",
                            "buttons": [
                                {
                                    "title":"Yes",
                                    "type":"postback",
                                    "payload":"reporter-has-been-denied-access"
                                },
                                {
                                    "title":"No",
                                    "type":"postback",
                                    "payload":"reporter-has-not-been-denied-access"
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
                "id": 9,
                "data": `{
                    "text": "TBD!"
                }`,
            }
        },

        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 10,
                "data": `{
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "Thank you! We need your permission to use your photos. Are you OK with us posting them?",
                            "buttons": [
                                {
                                    "title":"Yes",
                                    "type":"postback",
                                    "payload":"protester-confirmed-will-send-photos"
                                },
                                {
                                    "title":"No",
                                    "type":"postback",
                                    "payload":"protester-will-not-send-photos"
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
                "id": 12,
                "data": `{
                    "text": "That’s OK! Use an emoji to tell us how you’re feeling about the Convention today. OR Tell us in a word why you’re protesting today."
                }`,
                unstructuredReply: true
            }
        },

        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 13,
                "data": `{
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "Thank you! We need your permission to use your photos. Are you OK with us posting them?",
                            "buttons": [
                                {
                                    "title":"Yes",
                                    "type":"postback",
                                    "payload":"attendee-confirmed-will-send-photos"
                                },
                                {
                                    "title":"No",
                                    "type":"postback",
                                    "payload":"attendee-will-not-send-photos"
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
                "id": 14,
                "data": `{
                    "text": "That’s OK! Use an emoji to tell us how you’re feeling about the Convention today. OR Tell us in a word why you’re here."
                }`,
                unstructuredReply: true
            }
        },

        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 15,
                "data": `{
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "Would you feel comfortable sharing your story?",
                            "buttons": [
                                {
                                    "title":"Yes",
                                    "type":"postback",
                                    "payload":"journalist-will-share-story"
                                },
                                {
                                    "title":"No",
                                    "type":"postback",
                                    "payload":"journalist-will-not-share-story"
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
                "id": 16,
                "data": `{
                    "text": "*** Well, don't be a stranger, and let us know if you get barred from anything."
                }`,
                "unstructuredReply": true
            }
        },

        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 17,
                "data": `{
                    "text": "Cool! Send us your photos with a description."
                }`,
                "unstructuredReply": true
                // metadata: protesters
            }
        },

        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 18,
                "data": `{
                    "text": "Cool! Send us your photos with a description."
                }`,
                "unstructuredReply": true
                // metadata: attendees
            }
        },

        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 19,
                "data": `{
                    "text": "*** Great, please tell us about it -- and feel free to send us photos / video as well."
                }`,
                "unstructuredReply": true
            }
        },
        {
            "model": "Message",
            "keys": ["id"],
            "data": {
                "id": 20,
                "data": `{
                    "text": "That's OK, let's stay in touch though."
                }`,
                "unstructuredReply": true
            }
        },
    ];
