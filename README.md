# Subscription Management API 📃
The following project is a professional REST API for managing AI service subscriptions. It handles user authentication, subscription lifecycle, and related operations.
This platform is the backend project and it's built with Node.js and the Express framework, please take a look at the section stack below 👇 to know how to run it.

## Project stack information
The project is built with Node.js and Express which is a minimal and flexible framework for building REST APIs.
The project main language is Typescript (Javascript + Types) for all the patterns and logic, Express for routing and middleware, Mongoose for MongoDB object modeling, and JWT + bcryptjs for authentication and security.
To feel more familiar with these technologies and stack, please find below all relevant documentations :
- Node.js (The JavaScript runtime) -> [NODE DOCS](https://nodejs.org/en/docs/) 👩‍💻🧑‍💻
- Express (The web framework for Node.js) -> [EXPRESS DOCS](https://expressjs.com/) 💫
- Typescript (Javascript with types) -> [Typescript DOCS](https://www.typescriptlang.org/) 🧠
- Mongoose (MongoDB object modeling) -> [Mongoose DOCS](https://mongoosejs.com/docs/) 🧠
- JWT (JSON Web Tokens for auth) -> [JWT DOCS](https://jwt.io/introduction) 🔐

## Setup ⏳
Please make sure you have the minimum requirements to be able to run the project. This means you already have Node latest stable version and a running MongoDB instance installed.
Optional: You could also install Docker in case you would like to create a portable image and test it in a different machine.
- You can install node from here: [Download Node](https://nodejs.org/en) 🏗️
- You can install docker from here: [Download Docker](https://docs.docker.com/get-docker/) **(keep in mind this step is optional and not needed for app development)**
- Make sure to configure your environment variables by creating a `.env` file at the project root.

## How to run the project ⏲
This is a simple NPM project, this means you just need to install the packages used first, then the project will be able to be started:
1. Open a new terminal.
2. Cd (ie: locate) to the path of the project root.
3. Run the following command ``npm i``. The previous command will take a bit of time to install all the packages.
4. After that, run the command ``npm run dev``.
If everything is fine, then the server will start and listen on the configured port.

## Test the project 🧨
The project contains different test cases of functionalities and API endpoints:
1. Run the command ``npm run test``
This will execute all test suites using Jest with open handle detection. The output will display a summary of all passed and failed tests.

- The tests use an **in-memory MongoDB server** (`mongodb-memory-server`) so no real database connection is required to run them.
