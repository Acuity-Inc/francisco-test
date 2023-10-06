export default function getConfig() {
  return {
    oidc: {
      clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
      issuer: process.env.REACT_APP_OKTA_ISSUER,
      redirectUri: process.env.REACT_APP_OKTA_REDIRECT_URI,
      scopes: ['openid', 'profile', 'email'],
      pkce: true,
      disableHttpsCheck: process.env.REACT_APP_OKTA_TESTING_DISABLED_HTTP_CHECK,
    },
    resourceServer: {
      messagesUrl: 'http://localhost:8000/api/messages',
    },
    app: {
      basename: process.env.REACT_APP_DOMAIN,
    },
  };
}
