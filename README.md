# A project to learn about running a React app and an Express app side by side

See the [Fruit Dashboard app](https://blooming-peak-36437.herokuapp.com/) hosted on heroku for free!

## Quick start

Run command `npm start` to see the app in dev mode.

## More information

This project is split into three parts:
* End to end testing and deployment - Heroku and Cypress
* API - Express app and Mongo DB
* Client - React app

### Part 1 - End to end testing and deployment

#### Development

Use `npm start` to see the app on http://localhost:3000. 

This runs the API and client at the same time using [concurrently](https://www.npmjs.com/package/concurrently).

#### Testing

The end to end tests use [Cypress](https://www.cypress.io/) and can be run in the CLI using `npm run cypress:run`.

You can also use the Cypress UI which shows set by step how the test is running and where issues are. To do this, you need to start the app in test mode `npm run start:test` and then open Cypress in another terminal `npm run cypress:open`. You can then execute the tests from the Cypress app. Test mode allows the test suite to reset the DB on demand in order to have clean repeatable tests.

#### Deployment

A new release can be created using `npm run deploy:full`. This generates a new build of the API, client and then deploys them to Heroku.

You can check the very basic config for Heroku by looking at the `Procfile`.

### Part 2 - API

The contains an [Express app](https://expressjs.com/) using: 
* [Typescript](https://www.typescriptlang.org/) to make sure that the app is as strongly typed as possible
* [ESLint](https://eslint.org/) to make sure that the code is consistent
* [MongoDB](https://www.mongodb.com/) as the SaaS DB provider
* [Mongoose](https://mongoosejs.com/) to help simplify the interactions with the DB
* [Jest](https://jestjs.io/en/) as the test framework

#### Configuration

In order to connect to MongoDB and run the app you need to add a `.env` file at /api/.env.

This should contain:
* `PORT=9000` - You could use any other port other that 3000
* `TEST_MONGO_URL=`mongodb+srv://`username`:`password`@`url`?retryWrites=true&w=majority
* `MONGO_URL=`mongodb+srv://`username`:`password`@`url`?retryWrites=true&w=majority

#### Development

Use `npm start` to run the latest build on http://localhost:9000

Use `npm run dev` to run the version in development mode.

To create a new build use `npm run build` which compiles the typescript version into runtime JS.

ESLint is configured to maintain the style of the code, run `npm run lint`.

You can also test the typescript output without creating a build using `npm run typecheck`.

The app is split into the following folder:
1. Controllers - These contains the API business logic and endpoints
2. Models - This manages the DB structure and types
3. Utils
    * Config - Using the .env variables and provides them to the `app.tsx` file
    * Index - Contains the parsers to make sure that the data provided to the API is valid
    * Middleware - Manages errors or any other middleware like logging for each request
    * Types - Has the shared types for the Express app
4. App.tsx - This hooks all of the other logic into the app and also initialises the connection with the DB

#### Testing

The test suite uses Jest for unit tests, run `npm test`.

You can run the app in test mode using `npm run start:test` which allows to you hit the reset endpoint manually

### Part 3

`cd /fullstack_app/client` contains the react app which lets users see and manage data.

This is created on the basis of create-react-app with typescript, redux and thunk.

Use `npm start` to run the app and see it on http://localhost:3000 without any data.

The app uses the default jest test suite for unit tests by running `npm test`.
