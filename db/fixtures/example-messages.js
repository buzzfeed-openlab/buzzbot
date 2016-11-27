
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
                "text": "Hi! 👋 I'm BuzzBot.\\n\\nI can help you find your way around today’s Open Lab Show & Tell."
            }`,
            initialMessage: true,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 111,
            data: `{
                "text": "You can say things like OPEN LAB or MAP to help get oriented. Or you can say a fellow's name to get more info on them."
            }`,
            initialMessage: true,
            repeatable: true
        }
    },
    {
        model: "Message",
        keys: ["id"],
        data: {
            id: 112,
            data: `{
                "text": "Try asking about BEN, WES, AINSLEY, CHRISTINE, SAITO, and AMANDA."
            }`,
            initialMessage: true,
            repeatable: true
        }
    },

    {
        // openlab
        model: "Message",
        keys: ["id"],
        data: {
            id: 500,
            data: `{
                "text": "The BuzzFeed Open Lab for Journalism, Technology, and the Arts provides year-long fellowships to artists, hackers and engineers in BuzzFeed’s San Francisco bureau."
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // openlab 2
        model: "Message",
        keys: ["id"],
        data: {
            id: 501,
            data: `{
                "text": "I’d love to add you to our NEWSLETTER, or tell you more ABOUT THE OPEN LAB. Or if you feed me any of the Fellow’s names, I can tell you more about their work and what they’re showing off tonight."
            }`,
            repeatable: true
        }
    },
    {
        // newsletter
        model: "Message",
        keys: ["id"],
        data: {
            id: 502,
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
            id: 503,
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
            id: 504,
            data: `{

                  "attachment": {
                      "type": "image",
                      "payload":{
                          "url":"https://buzzfeed-openlab.github.io/imgs/event_map.png"
                      }
                  }
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
            id: 505,
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
        // saito software 2
        model: "Message",
        keys: ["id"],
        data: {
            id: 603,
            data: `{
                "text": "You can find the code here: https://github.com/owenst/geotweets"
            }`,
            repeatable: true
        }
    },
    {
        // saito software 3 (wants code)
        model: "Message",
        keys: ["id"],
        data: {
            id: 604,
            data: `{
                "text": "<link>"
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    // {
    //     // swale photo
    //     model: "Message",
    //     keys: ["id"],
    //     data: {
    //         id: 610,
    //         data: `{
    //             "attachment": {
    //                 "type": "image",
    //                 "payload":{
    //                     "url":""
    //                 }
    //             }
    //         }`
    //     },
    //     unstructuredReply: true
    // },
    {
        // swale
        model: "Message",
        keys: ["id"],
        data: {
            id: 611,
            data: `{
                "text": "Saito collaborated with Biome Arts to design a pavilion for Mary Mattingly’s nomadic floating garden, Swale. A sensor network tracked plant moisture, water flow and weather, while projection inside the pavilion displayed the data."
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // swale 2
        model: "Message",
        keys: ["id"],
        data: {
            id: 612,
            data: `{
                "text": "Saito also deployed a social media monitoring network in neighborhoods near the barge, to help spread the word."
            }`,
            repeatable: true
        }
    },
    // {
    //     // aemp photo
    //     model: "Message",
    //     keys: ["id"],
    //     data: {
    //         id: 620,
    //         data: `{
    //             "attachment": {
    //                 "type": "image",
    //                 "payload":{
    //                     "url":"https://img.buzzfeed.com/buzzfeed-static/static/2014-07/18/8/enhanced/webdr09/anigif_enhanced-buzz-32587-1405685331-4.gif"
    //                 }
    //             }
    //         }`
    //     },
    //     unstructuredReply: true
    // },
    {
        // aemp
        model: "Message",
        keys: ["id"],
        data: {
            id: 621,
            data: `{
                "text": "Saito designed a digital billboard that navigates a map of San Francisco, stopping at one site of eviction at a time."
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // aemp 2
        model: "Message",
        keys: ["id"],
        data: {
            id: 622,
            data: `{
                "text": "At each of these sites, one line from a testimony of the eviction is displayed. As the billboard traverses the city, a poem about displacement emerges."
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
                "text": "Ainsley Sutherland works on virtual reality research as a fellow at the BuzzFeed Open Lab."
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // ainsley bio 2
        model: "Message",
        keys: ["id"],
        data: {
            id: 702,
            data: `{
                "text": "Ainsley has worked as a designer, developer, and producer on virtual reality projects, alternate reality games, the decentralized web, and open government research. Ainsley completed graduate work at MIT’s Imagination, Computation, and Expression lab."
            }`,
            repeatable: true
        }
    },
    {
        // glance
        model: "Message",
        keys: ["id"],
        data: {
            id: 710,
            data: `{
                "text": "What if your body is an interface, and the environment is an agent? How can we sense the attention of others in a collaborative environment? How can we use these tools to create new types of nonfiction VR work?"
            }`,
            unstructuredReply: true,
            repeatable: true
        }
    },
    {
        // glance 2
        model: "Message",
        keys: ["id"],
        data: {
            id: 711,
            data: `{
                "text": "The prototypes and experiments on display showcase some of Ainsely’s research towards answering these questions in the BuzzFeed Open Lab."
            }`,
            repeatable: true
        }
    },

    {
            model: "Message",
            keys: ["id"],
            data: {
                id: 725,
                data: `{
                    "attachment": {
                        "type": "image",
                        "payload":{
                            "url":"https://buzzfeed-openlab.github.io/imgs/ainsley.jpg"
                        }
                    }
                }`,
                metadata: "ainsley photo",
                repeatable: true
            }
        },
        {
              model: "Message",
              keys: ["id"],
              data:{
                  id: 825,
                  data: `{
                      "attachment": {
                          "type": "image",
                          "payload":{
                              "url":"https://buzzfeed-openlab.github.io/imgs/christine.jpg"
                          }
                      }
                  }`,
                  metadata: "christine photo",
                  repeatable: true
              }
          },
          {
              model: "Message",
              keys: ["id"],
              data: {
                  id: 925,
                  data: `{
                      "attachment": {
                          "type": "image",
                          "payload":{
                              "url":"https://buzzfeed-openlab.github.io/imgs/ben.jpg"
                          }
                      }
                  }`,
                  metadata: "ben photo",
                  repeatable: true
              }
            },
            {
              model: "Message",
              keys: ["id"],
              data: {
                  id:425,
                  data: `{
                      "attachment": {
                          "type": "image",
                          "payload":{
                              "url":"https://buzzfeed-openlab.github.io/imgs/wes.png"
                          }
                      }
                  }`,
                  metadata: "wes photo",
                  repeatable: true
              }
          },
          {
              model: "Message",
              keys: ["id"],
              data: {
                  id:525,
                  data: `{
                      "attachment": {
                          "type": "image",
                          "payload":{
                              "url":"https://buzzfeed-openlab.github.io/imgs/amanda.jpg"
                          }
                      }
                  }`,
                  metadata: "amanda photo",
                  repeatable: true
              }
            },
            {
                // Amanda
                model: "Message",
                keys: ["id"],
                data: {
                    id:526,
                    data: `{
                        "text": "Amanda Hickman, Senior Fellow // Amanda directs the BuzzFeed Open Lab for Journalism, Technology, and the Arts."
                    }`,
                    unstructuredReply: true,
                    metadata: "amanda",
                    repeatable: true
                }
            },
            {
                // Christine
                model: "Message",
                keys: ["id"],
                data: {
                    id:800,
                    data: `{
                        "text": "Christine Sunu, Open Lab / GE Fellow, focuses on the links between emotion, design, and technology. In the Open Lab this year she built emotive interfaces for internet connected technology. Emotive Circuits is a collection of objects that that showcase internet connected technology in soft and unusual forms."
                    }`,
                    unstructuredReply: true,
                    metadata: "christine",
                    repeatable: true
                }
            },

            {
                // Ben
                model: "Message",
                keys: ["id"],
                data: {
                    id:900,
                    data: `{
                        "text": "Ben Kreimer explores the unique perspectives, visual experiences, and storytelling potential of drones, 3D reconstructions, 360-degree video, 3D virtual reality, and open-source hardware sensor platforms."
                    }`,
                    unstructuredReply: true,
                    metadata: "ben",
                    repeatable: true
                }
            },{
                // Wes
                model: "Message",
                keys: ["id"],
                data: {
                    id:400,
                    data: `{
                        "text": "Westley Hennigh-Palermo is interested in finding new ways for newsrooms to engage people in conversation and talk about complex systems that don't lend themselves to simple narratives. At the Open Lab Wes has worked on a series of bots and games, including BUZZBOT and SHIT VCS SAY."
                    }`,
                    unstructuredReply: true,
                    metadata: "Wes",
                    repeatable: true
                }
            },{
                model: "Message",
                keys: ["id"],
                data: {
                    id:401,
                    data: `{
                        "text": "That's me 🤖 -- I ran throughout the 2016 RNC and DNC and facilitated conversation between journalists and thousands of people who were watching from home, protesting outside, or actually attending as delegates."
                    }`,
                    metadata: "buzzbot",
                    unstructuredReply: true,
                    repeatable: true
                }
            },{
                model: "Message",
                keys: ["id"],
                data: {
                    id:402,
                    data: `{
                        "text": "I'm also open source! 🤖 https://github.com/buzzfeed-openlab/buzzbot"
                    }`,
                    metadata: "buzzbot",
                    repeatable: true
                }
            },
            {
                model: "Message",
                keys: ["id"],
                data: {
                    id:420,
                    data: `{
                        "text": "Shit VCs Say is an iOS game about the weirder propaganda coming out of Silicon Valley..."
                    }`,
                    metadata: "shitvcssay",
                    unstructuredReply: true,
                    repeatable: true
                }
            },{
                model: "Message",
                keys: ["id"],
                data: {
                    id:421,
                    data: `{
                        "text": "Check it out here: https://itunes.apple.com/us/app/s**t-vcs-say/id1090534404"
                    }`,
                    metadata: "shitvcssay",
                    repeatable: true
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
    },

]
