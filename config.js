
module.exports = {
    env: process.env.NODE_ENV || "production",

    baseFbUrl: process.env.FB_URL || "https://graph.facebook.com/v2.6",
    pageToken: process.env.FB_PAGE_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN || "beep boop bop",
    port: CB_PORT || 8080,
    auth: { user: process.env.AUTH_USER, password: process.env.AUTH_PASSWORD }
};
