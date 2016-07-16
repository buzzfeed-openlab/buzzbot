module.exports = [
    // msg 110 not-following-convention
    {
        model: 'Trigger',
        data: {
            id: 110,
            tagId: 110,
            messages: [120]
        }
    },
    // msg 110 following-from-cleveland
    {
        model: 'Trigger',
        data: {
            id: 111,
            tagId: 111,
            messages: [121]
        }
    },
    // msg 110 following-from-home
    {
        model: 'Trigger',
        data: {
            id: 112,
            tagId: 112,
            messages: [122]
        }
    },


    // msg 121 attending-convention
    {
        model: 'Trigger',
        data: {
            id: 120,
            tagId: 120,
            messages: [140]
        }
    },
    // msg 121 protesting-convention
    {
        model: 'Trigger',
        data: {
            id: 121,
            tagId: 121,
            messages: [141]
        }
    },
    // msg 121 lives-in-cleveland
    {
        model: 'Trigger',
        data: {
            id: 122,
            tagId: 122,
            messages: [132]
        }
    },


    // msg 140 attending-might-send-media
    {
        model: 'Trigger',
        data: {
            id: 140,
            tagId: 140,
            messages: [160]
        }
    },
    // msg 140 attending-wont-send-media
    {
        model: 'Trigger',
        data: {
            id: 141,
            tagId: 141,
            messages: [150]
        }
    },


    // msg 141 protesting-might-send-media
    {
        model: 'Trigger',
        data: {
            id: 142,
            tagId: 142,
            messages: [161]
        }
    },
    // msg 141 protesting-wont-send-media
    {
        model: 'Trigger',
        data: {
            id: 143,
            tagId: 143,
            messages: [151]
        }
    },


    // msg 160 attending-confirmed-will-send-media
    {
        model: 'Trigger',
        data: {
            id: 160,
            tagId: 160,
            messages: [170]
        }
    },
    // msg 160 attending-wont-send-media
    {
        model: 'Trigger',
        data: {
            id: 161,
            tagId: 161,
            messages: [150]
        }
    },


    // msg 161 protesting-confirmed-will-send-media
    {
        model: 'Trigger',
        data: {
            id: 162,
            tagId: 162,
            messages: [171]
        }
    },
    // msg 161 protesting-wont-send-media
    {
        model: 'Trigger',
        data: {
            id: 163,
            tagId: 163,
            messages: [151]
        }
    },


    // msg 170 [attending] how should we credit u? 
    {
        model: 'Trigger',
        data: {
            id: 170,
            triggerMessageId: 170,
            messages: [180]
        }
    },


    // msg 171 [protesting] how should we credit u? 
    {
        model: 'Trigger',
        data: {
            id: 171,
            triggerMessageId: 171,
            messages: [181]
        }
    },


    // msg 180 [attending] emoji poll
    {
        model: 'Trigger',
        data: {
            id: 180,
            triggerMessageId: 180,
            messages: [190]
        }
    },


    // msg 181 [protesting] emoji poll
    {
        model: 'Trigger',
        data: {
            id: 181,
            triggerMessageId: 181,
            messages: [191]
        }
    },


    // msg 122 [following-from-home] emoji poll
    {
        model: 'Trigger',
        data: {
            id: 123,
            triggerMessageId: 122,
            messages: [192]
        }
    },


    // msg 132 [lives-in-cleveland] emoji poll
    {
        model: 'Trigger',
        data: {
            id: 132,
            triggerMessageId: 132,
            messages: [192]
        }
    },


    // msg 150 [attending-convention] emoji poll
    {
        model: 'Trigger',
        data: {
            id: 150,
            triggerMessageId: 150,
            messages: [190]
        }
    },


    // msg 151 [protesting-convention] emoji poll
    {
        model: 'Trigger',
        data: {
            id: 151,
            triggerMessageId: 151,
            messages: [191]
        }
    }
]
