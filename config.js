
module.exports = {
    env: process.env.NODE_ENV || "development",

    baseFbUrl: process.env.FB_URL || "https://graph.facebook.com/v2.6",
    pageToken: process.env.FB_PAGE_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
    port: process.env.CB_PORT || 8080
};
