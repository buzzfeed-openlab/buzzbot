module.exports = {
    env: process.env.NODE_ENV || "development",

    pageToken: "fb-page-token",
    verifyToken: "app-secret-that-you-create",
    port: 8000,

    auth: {
        user: 'admin-page-user',
        password: 'admin-page-pass'
    }
};
