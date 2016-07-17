
module.exports = [
    {
        "model": "Message",
        "keys": ["id"],
        "data": {
            "id": 50,
            "data": `{
                "text": "No problem! If you want to get in touch again, just say 'START' or 'RESUME'"
            }`,
            "unstructuredReply": true
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
            "unstructuredReply": true
        }
    },
    {
        "model": "Message",
        "keys": ["id"],
        "data": {
            "id": 52,
            "data": `{
                "text": "Surprise, I'm out of surprises! :P\\n\\nBut check back later and maybe I'll have something new, I NEVER SLEEP"
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
                        "text": "Hi 👋 My name is BuzzBot. I'm collecting stories from the Republican National Convention in Cleveland. Are you following the convention?",
                        "buttons": [
                            {
                                "title": "No",
                                "type": "postback",
                                "payload": "not-following-convention"
                            },
                            {
                                "title": "Yes, I'm in town",
                                "type": "postback",
                                "payload": "following-from-cleveland"
                            },
                            {
                                "title": "Yes, from home",
                                "type": "postback",
                                "payload": "following-from-home"
                            }
                        ]
                    }
                }
            }`,
            initialMessage: true
        }
    },

    {
        // not-following-convention
        model: "Message",
        keys: ["id"],
        data: {
            id: 120,
            data: `{
                "text": "No worries, press another button to let me know if you change your mind."
            }`,
            unstructuredReply: true
        }
    },
    {
        // following-from-cleveland
        model: "Message",
        keys: ["id"],
        data: {
            id: 121,
            data: `{
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Cool! What brings you to Cleveland?",
                        "buttons": [
                            {
                                "title": "I’m attending",
                                "type": "postback",
                                "payload": "attending-convention"
                            },
                            {
                                "title": "I’m protesting",
                                "type": "postback",
                                "payload": "protesting-convention"
                            },
                            {
                                "title": "I just live here",
                                "type": "postback",
                                "payload": "lives-in-cleveland"
                            }
                        ]
                    }
                }
            }`,
        }
    },
    {
        // following-from-home
        model: "Message",
        keys: ["id"],
        data: {
            id: 122,
            data: `{
                "text": "Got it. For now, we’d love to see the emoji that best captures your feelings about the Convention."
            }`,
            unstructuredReply: true,
            poll: "{}",
            metadata: "following-from-home"
        }
    },

    {
        // lives-in-cleveland
        model: "Message",
        keys: ["id"],
        data: {
            id: 132,
            data: `{
                "text": "But are you really from Cleveland? https://www.buzzfeed.com/jessicamisener/fuck-yeah-pierogis\\n\\nSeriously though, we’d love to see the emoji that best captures your feelings about the Convention."
            }`,
            unstructuredReply: true,
            poll: "{}",
            metadata: "lives-in-cleveland"
        }
    },

    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 140,
            data: `{
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Alright. Would you be willing to send me photos or videos of what’s happening around you? I’ll occasionally ask you for something specific, and you can send me anything from the convention you think is interesting at any time 📲",
                        "buttons": [
                            {
                                "title": "Sure, I can do that",
                                "type": "postback",
                                "payload": "attending-might-send-media"
                            },
                            {
                                "title": "I won’t want to",
                                "type": "postback",
                                "payload": "attending-wont-send-media"
                            }
                        ]
                    }
                }
            }`,
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 141,
            data: `{
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Alright. Would you be willing to send me photos or videos of what’s happening around you? I’ll occasionally ask you for something specific, and you can send me anything from the convention you think is interesting at any time 📲",
                        "buttons": [
                            {
                                "title": "Sure, I can do that",
                                "type": "postback",
                                "payload": "protesting-might-send-media"
                            },
                            {
                                "title": "I won’t want to",
                                "type": "postback",
                                "payload": "protesting-wont-send-media"
                            }
                        ]
                    }
                }
            }`,
        }
    },

    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 150,
            data: `{
                "text": "Got it. For now, we’d love to see the emoji that best captures your feelings about the Convention."
            }`,
            unstructuredReply: true,
            poll: "{}",
            metadata: "attending-convention"
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 151,
            data: `{
                "text": "Got it. For now, we’d love to see the emoji that best captures your feelings about the Convention."
            }`,
            unstructuredReply: true,
            poll: "{}",
            metadata: "protesting-convention"
        }
    },

    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 160,
            data: `{
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Thank you! If you send us any photos or videos, remember that we can’t use them unless you own them yourself and give us permission to use the media across our platforms. You’ll still own the media, but we need permission to use it.",
                        "buttons": [
                            {
                                "title": "Yes, got it",
                                "type": "postback",
                                "payload": "attending-confirmed-will-send-media"
                            },
                            {
                                "title": "Err, maybe not.",
                                "type": "postback",
                                "payload": "attending-wont-send-media"
                            }
                        ]
                    }
                }
            }`,
            metadata: "attending-convention"
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 161,
            data: `{
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Thank you! If you send us any photos or videos, remember that we can’t use them unless you own them yourself and give us permission to use the media across our platforms. You’ll still own the media, but we need permission to use it.",
                        "buttons": [
                            {
                                "title": "Yes, got it",
                                "type": "postback",
                                "payload": "protesting-confirmed-will-send-media"
                            },
                            {
                                "title": "Err, maybe not.",
                                "type": "postback",
                                "payload": "protesting-wont-send-media"
                            }
                        ]
                    }
                }
            }`,
            metadata: "protesting-convention"
        }
    },

    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 170,
            data: `{
                "text": "W00t. How should we credit you? Respond with something like: \\"BuzzBot for BuzzFeed News\\" or \\"Jon Snow.\\" You probably just want to use your full name. 😊"
            }`,
            unstructuredReply: true,
            metadata: "attending-convention"
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 171,
            data: `{
                "text": "W00t. How should we credit you? Respond with something like: \\"BuzzBot for BuzzFeed News\\" or \\"Jon Snow.\\" You probably just want to use your full name. 😊"
            }`,
            unstructuredReply: true,
            metadata: "protesting-convention"
        }
    },

    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 180,
            data: `{
                "text": "Thank you! For now, we’d love to see the emoji that best captures your feelings about the Convention."
            }`,
            unstructuredReply: true,
            poll: "{}",
            metadata: "attending-convention"
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 181,
            data: `{
                "text": "Thank you! For now, we’d love to see the emoji that best captures your feelings about the Convention."
            }`,
            unstructuredReply: true,
            poll: "{}",
            metadata: "protesting-convention"
        }
    },

    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 190,
            data: `{
                "text": "Nice emoji 👀. I’ll be in touch."
            }`,
            unstructuredReply: true,
            metadata: "attending-convention"
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 191,
            data: `{
                "text": "Nice emoji 👀. I’ll be in touch."
            }`,
            unstructuredReply: true,
            metadata: "protesting-convention"
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 192,
            data: `{
                "text": "Nice emoji 👀. I’ll be in touch."
            }`,
            unstructuredReply: true,
            metadata: "at-home"
        }
    },

    // -------

    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 500,
            data: `{
                "text": "These Words Have Been Tested By Science To Get You To Vote: https://www.buzzfeed.com/peteraldhous/science-hacks-the-vote"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 501,
            data: `{
                "text": "27 Of The Best Campaign Buttons From U.S. Presidential History: https://www.buzzfeed.com/gabrielsanchez/best-campaign-buttons"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 502,
            data: `{
                "text": "A British Person Tries To Explain The Electoral College: https://www.buzzfeed.com/hannahjewell/a-british-person-tries-to-explain-the-electoral-college"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 503,
            data: `{
                "text": "8 Big Decisions That Will Be Made By Whoever Wins The Election: https://www.buzzfeed.com/venessawong/eight-big-decisions-that-will-be-made-by-whoever-wins-the-el"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 504,
            data: `{
                "text": "18 “The West Wing” Moments That Will Give You Hope: https://www.buzzfeed.com/adambvary/the-west-wing-moments-that-will-give-you-hope"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 505,
            data: `{
                "text": "Why Do People, Who Say They Want To Vote, Not Vote?: https://www.buzzfeed.com/evanmcsan/why-do-people-who-say-they-want-to-vote-not-vote"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 506,
            data: `{
                "text": "Can You Match The President With His Pet?: https://www.buzzfeed.com/chelseamarshall/can-you-match-the-president-with-his-pet"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 507,
            data: `{
                "text": "A Ranking Of The Hottest U.S. Presidents: https://www.buzzfeed.com/jessicamisener/pilfs"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 508,
            data: `{
                "text": "Can You Pick If Donald Trump Or The Joker Said These Quotes?: https://www.buzzfeed.com/spenceralthouse/donald-trump-or-the-joker"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 509,
            data: `{
                "text": "If Donald Trump were a contestant on \\"The Bachelorette\\": https://www.buzzfeed.com/jenlewis/if-donald-trump-were-on-the-bachelorette"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 510,
            data: `{
                "text": "We’ve Seen Donald Trump’s Press Secretary Before — On A Gossip Girl Book Cover: https://www.buzzfeed.com/jarrylee/xoxo-hope-hicks"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 511,
            data: `{
                "text": "This 1996 \\"Simpsons\\" Political Parody Is Still Scarily Relevant: https://www.buzzfeed.com/louispeitzman/the-best-simpsons-political-parody-is-still-scarily-relevant"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 512,
            data: `{
                "text": "15 Actual Donald Trump Quotes Spoken By Villains: https://www.buzzfeed.com/jamiejones/a-big-fat-dose-of-global-warming"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 513,
            data: `{
                "text": "People Think Donald Trump Actually Looks Like This New Pokemon: https://www.buzzfeed.com/samstryker/donald-trump-pokemon"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 514,
            data: `{
                "text": "This Guy Reimagined The Presidential Candidates As Pokémon And It’s As Awesome As You Think: https://www.buzzfeed.com/krishrach/this-guy-reimagined-the-presidential-candidates-as-pokemon-a"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 515,
            data: `{
                "text": "Donald Trump vs Sea Level Rise: https://www.buzzfeed.com/peteraldhous/trump-buildings-underwater"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 516,
            data: `{
                "text": "Hillary Clinton's comments on the \\"Superpredator\\" theory of crime: https://www.buzzfeed.com/danvergano/superpredator-theory"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 517,
            data: `{
                "text": "5 Things That Made No Sense In Trump’s Big Energy Speech: https://www.buzzfeed.com/danvergano/trumps-energy-speech"
            }`,
            unstructuredReply: true,
            surpriseMe: true
        }
    }
]