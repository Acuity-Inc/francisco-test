import getConfig from './config'; // adjust this import path as necessary

describe('config.ts test', () => {
  it('returns the correct config object', () => {
    const originalProcessEnv = process.env;

    // Mock the necessary environment variables
    const mockEnv = {
      REACT_APP_OKTA_CLIENT_ID: 'mockClientId',
      REACT_APP_OKTA_ISSUER: 'mockIssuer',
      REACT_APP_OKTA_REDIRECT_URI: 'mockRedirectUri',
      REACT_APP_OKTA_TESTING_DISABLED_HTTP_CHECK: 'true',
      REACT_APP_DOMAIN: 'mockDomain',
    };
    process.env = { ...originalProcessEnv, ...mockEnv };

    // Call the getConfig function
    const config = getConfig();

    // Assert the values in the returned config object
    expect(config.oidc.clientId).toEqual(mockEnv.REACT_APP_OKTA_CLIENT_ID);
    expect(config.oidc.issuer).toEqual(mockEnv.REACT_APP_OKTA_ISSUER);
    expect(config.oidc.redirectUri).toEqual(mockEnv.REACT_APP_OKTA_REDIRECT_URI);
    expect(config.oidc.scopes).toEqual(['openid', 'profile', 'email']);
    expect(config.oidc.pkce).toBe(true);
    expect(config.oidc.disableHttpsCheck).toEqual(
      mockEnv.REACT_APP_OKTA_TESTING_DISABLED_HTTP_CHECK
    );
    expect(config.resourceServer.messagesUrl).toEqual('http://localhost:8000/api/messages');
    expect(config.app.basename).toEqual(mockEnv.REACT_APP_DOMAIN);

    // Restore the original process.env
    process.env = originalProcessEnv;
  });
});
