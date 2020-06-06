# A project to learn about running a React app and an Express app side by side

## Quick start

Run command cd /fullstack_app && npm start to see the app.

## More information

This project is split into three parts:

### Part 1

/fullstack-app contains the end to end test suite and runs both apps concurrently.

Use npm start to see the app on http://localhost:3000

The end to end tests use Cypress.io and can be run with npm test.

### Part 2

/fullstack_app/api contains a node app using typescript which manages the data.

Use npm start to run the latest build on http://localhost:9000

Use npm run dev to run the version in development.

To create a new build use npm run build which compiles the typescript version into runtime JS.

The test suite uses Jest for unit test, run npm test.

ESLint is configured to maintain the style of the code and enforce typescript rules, run npm run lint.

### Part 3

/fullstack_app/client contains the react app which lets users see and manage data.

This is created on the basis of create-react-app with typescript, redux and thunk.

Use npm start to run the app and see it on http://localhost:3000 without any data.

The app uses the default jest test suite for unit tests by running npm test.
