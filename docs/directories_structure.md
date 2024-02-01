# Directories structure

## Root Structure

```text
{root}
  ∟ src/ (Source code)
  ∟ config/ (Configuration files)
  ∟ public/ (Publicly accessible files)
  ∟ tests/ (Unit and integration tests)
  ∟ scripts/ (Utility scripts)
  ∟ node_modules/ (Node.js dependencies, managed by npm)

  # Documentation
  ∟ docs/ (Documentation)
  ∟ README.md (Project documentation)

  # PROJECT CONFIG FILES
  ∟ .gitignore (Git ignored files)
  ∟ .nest-cli.json (Nest main configuration file)
  ∟ .npmrc (Npm config file config for npm behaviours and add private packages dependencies)
  ∟ .serverless.ts (Serverless config [handle packing the app to deploy to the cloud])
  ∟ package.json (Project configuration)
  ∟ tsconfig.json (TypeScript configuration)
  ∟ webpack.config.js (Webpack configuration (Helps bundle less code to the cloude with serverless framework))

  # DEVELOPMENT QUALITY FILES/DIR
  ∟ .vscode/ (Vscode shared config files)
  ∟ .eslint* (Eslint configs [code rules enforcement])
  ∟ .prettier.config.js (Prettier config [code style enforcement])
  ∟ .editorconfig (Editor shared configuration)
```

## "Detailed"

```text
application (Application/business logic)
  ∟ usecases (Application-specific use cases)
  ∟ services (Application services)
  ∟ models (Application-specific models)
  ∟ repositories (Interfaces for data access)
  ∟ exceptions (Custom exceptions)
framework (Framework-specific code)
  ∟ controllers (Web/API controllers)
  ∟ middlewares (Middleware for request handling)
  ∟ views (View-related code)
  ∟ routes (URL routing)
domain (Core domain logic)
entities (Domain entities)
infrastructure (External services and data access)
  ∟ data (Data access code)
    ∟ models (Database or data storage models)
    ∟ repositories (Implementations of repository interfaces)
    ∟ migrations (Database migrations)
  ∟ external (Third-party services, e.g., APIs)
  ∟ interfaces (Interfaces and protocols)
    ∟ repositories (Repository interfaces)
    ∟ services (Service interfaces)
utils (Utility functions)
tests (tests)
  ∟ unit (Unit tests)
  ∟ integration (Integration tests)
  ∟ e2e (End-to-end tests)
config (config)
  ∟ env (Environment-specific configuration files)
  ∟ app.ts (General application configuration)
  ∟ database.ts (Database configuration)
  ∟ logging.ts (Logging configuration)
scripts (scripts)
  ∟ build.ts (TypeScript build script)
  ∟ start.ts (Application start script)
  ∟ test.ts (Testing automation script)
docs (docs)
  ∟ api (API documentation if applicable)
  ∟ architecture (Architectural documentation)
  ∟ user_guide (User or developer guides)
```
