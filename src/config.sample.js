/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error('Do not import `config.js` from inside the client-side code.');
}

module.exports = {
  port: process.env.PORT || 3000,

  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,
    // Github web hook callback
    webHookUrl: process.env.WEB_HOOK_URL || ``,
  },

  databaseUrl: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/database',

  analytics: {
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'A secret' },

    github: {
      id: process.env.GITHUB_ID || '.',
      secret: process.env.GITHUB_SECRET || '',
      webhookSecret: process.env.GITHUB_WEBHOOK_SECRET || '',
    },
  },
};
