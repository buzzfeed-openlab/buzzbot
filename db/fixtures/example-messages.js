
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
        // openlab
        model: "Message",
        keys: ["id"],
        data: {
            id: 500,
            data: `{
                "text": "BuzzFeed's Open Lab for Journalism, Technology, and the Arts provides year-long fellowships to artists, hackers and engineers.\\n\\nI’d love to add you to our NEWSLETTER, or tell you more ABOUT THE OPEN LAB. Or if you feed me any of the Fellow’s names, I can tell you more about what they’re showing off tonight."
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // newsletter
        model: "Message",
        keys: ["id"],
        data: {
            id: 501,
            data: `{
                "text": "Cool. I’d love to add you to our Tinyletter. What is your email address?"
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // about the open lab
        model: "Message",
        keys: ["id"],
        data: {
            id: 502,
            data: `{
                "text": "The best place to learn more about BuzzFeed\'s Open Lab is probably: http://www.buzzfeed.com/amandahickman/about-the-open-lab"
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // map
        model: "Message",
        keys: ["id"],
        data: {
            id: 503,
            data: `{
                "text": "https://www.dropbox.com/sh/yat2vr7keoye3h5/AACKpkzeHXWJo5rFCwPNXMbYa/BF_OL_map.ai?dl=0"
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // ge
        model: "Message",
        keys: ["id"],
        data: {
            id: 504,
            data: `{
                "text": "GE sponsors one Open Lab fellowship\\n\\nGE’s Neuro VR Experience is a peek into how scientists are breakign new ground to understand how the brain works through advanced imaging technology."
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // saito
        model: "Message",
        keys: ["id"],
        data: {
            id: 600,
            data: `{
                "text": "The Saito Group, Open Lab / Eyebeam Fellow\\n\\nSaito is a collective of writers, designers and hackers in support of the right to the city, data rights and economic solidarity.\\n\\nI can tell you more about SAITO’S SOFTWARE or their collaborations with SWALE and AEMP."
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // saito photo
        model: "Message",
        keys: ["id"],
        data: {
            id: 601,
            data: `{
                "text": "Saito doesn’t sit for portraits. But their Instagram is pretty great: https://www.instagram.com/saitogroup 📸"
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // saito software
        model: "Message",
        keys: ["id"],
        data: {
            id: 602,
            data: `{
                "text": "Saito’s social media listening tool scans Twitter and allows you to visualize what is being tweeted within a geographical radius. Saito’s intelligent keyboard flags strings you might want from a corpus, based on past writing. Together, the devices scan crowds and write texts based on its social media output."
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // swale
        model: "Message",
        keys: ["id"],
        data: {
            id: 603,
            data: `{
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Saito collaborated with Biome Arts to design a pavilion for Mary Mattingly’s nomadic floating garden, Swale. A sensor network tracked plant moisture, water flow and weather, while projection inside the pavilion displayed the data. Saito also deployed a social media monitoring network in neighborhoods near the barge, to help spread the word.",
                        "buttons": [
                            {
                                "title": "Tell Me More",
                                "type": "postback",
                                "payload": "more-swale"
                            },
                            {
                                "title": "Photo 📸",
                                "type": "postback",
                                "payload": "photo-swale"
                            }
                        ]
                    }
                }
            }`,
            repeatable: true
        }
    },
    {
        // aemp
        model: "Message",
        keys: ["id"],
        data: {
            id: 604,
            data: `{
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Saito designed a digital billboard that navigates a map of San Francisco, stopping at one site of eviction at a time. At each of these sites, one line from a testimony of the eviction is displayed. As the billboard traverses the city, a poem about displacement emerges.",
                        "buttons": [
                            {
                                "title": "Tell Me More",
                                "type": "postback",
                                "payload": "more-aemp"
                            },
                            {
                                "title": "Photo 📸",
                                "type": "postback",
                                "payload": "photo-aemp"
                            }
                        ]
                    }
                }
            }`,
            repeatable: true
        }
    },
    {
        // ainsley
        model: "Message",
        keys: ["id"],
        data: {
            id: 700,
            data: `{
                "text": "Ainsley has been working on Glance, a toolkit for interaction in VR that foregrounds the realtime relationship between a user's body and the VR system, and experiments with attention, sound, and embodied cognition.\\n\\nDo you want to learn more about AINSLEY’S BIO, or more about GLANCE?"
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // ainsley bio
        model: "Message",
        keys: ["id"],
        data: {
            id: 701,
            data: `{
                "text": "Ainsley Sutherland works on virtual reality research at the Open Lab. Ainsley has worked as a designer, developer, and producer on virtual reality projects, alternate reality games, the decentralized web, and open government research. Ainsley completed graduate work at MIT’s Imagination, Computation, and Expression lab"
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // glance
        model: "Message",
        keys: ["id"],
        data: {
            id: 702,
            data: `{
                "text": "What if your body is an interface, and the environment is an agent? How can we sense the attention of others in a collaborative environment? How can we use these tools to create new types of nonfiction VR work? The experiments on display showcase some of Ainsely’s research towards answering these questions."
            }`,
            unstructuredReply: true,
            repeatable: true
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
                        "text": "Hi! 👋 I'm BuzzBot.\\n\\nI can help you find your way around today’s Open Lab Show & Tell.",
                        "buttons": [
                            {
                                "title": "Great, I'm here",
                                "type": "postback",
                                "payload": "at-event"
                            },
                            {
                                "title": "What's that?",
                                "type": "postback",
                                "payload": "what-is-event"
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
