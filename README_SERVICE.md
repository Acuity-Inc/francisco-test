# techchallenge-template-react-web
React Web App template

## Getting Started

### Prerequisites
- Node version 18 installed or higher
- IDE
  - Developed using VS Code

### How to contribute to Acuity Repos
- Please follow branch naming conventions described in [Development Best Practices](https://acuity-inc.atlassian.net/wiki/spaces/TCS1/pages/1993113601/Development+Best+Practices)
- Commit conventions as described in [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)

## Running the Application
In the root directory run the following commands and navigate to http://localhost:3000
```
npm install
npm start
```

## Testing the Application
Run unit tests:

```
npm run test
```

Running unit tests with code coverage:

```
npm run coverage
```

## End-To-End testing

### Overview

End-To-End testing is accomplished using Cypress.

Cypress runs end-to-end tests the same way users interact with your app by using a real browser, visiting URLs, viewing content, clicking on links and buttons, etc.
Testing this way helps ensure your tests and the user's experience are the same.

Cypress tests are located in the `cypress/e2e` directory. Cypress fixture files (static data to be used by tests) are located in the `cypress/fixtures` directory.
Additional documentation about Cypress can be found at https://docs.cypress.io/guides/end-to-end-testing/testing-your-app

### Running Cypress tests

Before running Cypress tests, ensure the web application is running (`npm start`) and that the `REACT_APP_CYPRESS_BASE_URL` environment variable is set to the running application (typically `http://localhost:3000`). In addition, at the root level, copy the `cypress.sample.env.json` file into a `cypress.env.json` file and populate the json values.

Cypress tests can be run in 3 ways:

- `npm run cy:run:local` for running the tests and viewing the results directly in the command line
- `npm run cy:open:local` for running the tests and viewing the results in the browser

### Formatting and linting
Format the code with Prettier:
```
npm run format
```

Lint the code with ESLint:
```
npm run lint
```

## Application Features
### Okta Integration for Authorization
The configuration for Okta is specified in `src/okta/config.ts`, which reads from the environment variables.
In order to use your own Okta configuration, the following environment variables will need to be updated as needed:
| Variable | Description |
| -------- | ------- |
| REACT_APP_OKTA_CLIENT_ID | Client ID of your Application. You can copy it from the Okta Admin Console for your specific application |
| REACT_APP_OKTA_ISSUER | It is used to define the {baseUrl} in any OIDC endpoint when authorizing against the Okta Org Authorization Server |
| REACT_APP_OKTA_REDIRECT_URI | The redirect URI consists of the URL of the template web application appended by `/login/callback` |
| REACT_APP_OKTA_TESTING_DISABLED_HTTP_CHECK | Only should be set to true if needed for local testing |

Note: To support logout, the Trusted Origins had to be updated in Okta Admin to include the web app url (configured at `Security->API->Trusted Origin`).
### Backend Integration for CRUD Operations

## Development Design Practices

Okta Oath2.0 is integrated to support user authentication.