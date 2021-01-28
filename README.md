# Pets Monorepo

Learn more about the application's structure and the difference between the apps by [reading the docs](./docs/architecture.md).

## Development server with JSON-server or Express

Run `nx run my-app:start` for a dev server to start with either JSON-server or Express. Navigate to http://localhost:4200/ for the app and http://localhost:4000/ for the api. The app will automatically reload if you change any of the source files and the api is automatically proxied to the app.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Generate an application

Run `nx generate my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx generate my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@pet-tracker/mylib`.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
