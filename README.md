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
- Docker (Containerization platform) -> [Docker DOCS](https://docs.docker.com/) 🐳

## Setup ⏳
Please make sure you have the minimum requirements to be able to run the project. This means you already have Node latest stable version and a running MongoDB instance installed.
Optional: You could also install Docker in case you would like to run the whole stack (API + MongoDB) in containers without installing Node or MongoDB locally.
- You can install node from here: [Download Node](https://nodejs.org/en) 🏗️
- You can install docker from here: [Download Docker](https://docs.docker.com/get-docker/) **(keep in mind this step is optional and not needed for app development)**
- Make sure to configure your environment variables by creating a `.env` file at the project root.

## How to run the project ⏲

### Option 1: Run locally with NPM
This is a simple NPM project, this means you just need to install the packages used first, then the project will be able to be started:
1. Open a new terminal.
2. Cd (ie: locate) to the path of the project root.
3. Run the following command ``npm i``. The previous command will take a bit of time to install all the packages.
4. After that, run the command ``npm run dev``.
If everything is fine, then the server will start and listen on the configured port.

### Option 2: Run with Docker 🐳
The project now ships with a `Dockerfile` and a `docker-compose.yml` file, allowing you to spin up both the API and its MongoDB database in isolated containers, with no need to install Node.js or MongoDB on your machine.

**What's included:**
- **api**: builds the Node.js/Express API from the project's `Dockerfile` (Node 20 Alpine) and exposes it on port `3000`.
- **mongodb**: runs a MongoDB 7 instance and exposes it on port `27017`.

**Steps to run:**
1. Open a new terminal.
2. Cd (ie: locate) to the path of the project root.
3. Run the following command:
   ```bash
   docker compose up --build
   ```
4. Once both containers are up, the API will be available at `http://localhost:3000` and MongoDB will be reachable at `localhost:27017`.
5. To stop the containers, press `Ctrl+C`, then run:
   ```bash
   docker compose down
   ```

**Notes:**
- The API container mounts the project directory as a volume, so code changes on your machine are reflected inside the container automatically (useful for development with `npm run dev`).
- MongoDB data is persisted in a named Docker volume (`mongodb_data`), so your data survives container restarts.
- Default environment variables (`PORT`, `JWT_SECRET`, `MONGO_URI`) are already configured in `docker-compose.yml` for local/dev use. Update them there (or via a `.env` file referenced by Compose) before deploying to any shared or production environment.

## Test the project 🧨
The project contains different test cases of functionalities and API endpoints:
1. Run the command ``npm run test``
This will execute all test suites using Jest with open handle detection. The output will display a summary of all passed and failed tests.

- The tests use an **in-memory MongoDB server** (`mongodb-memory-server`) so no real database connection is required to run them.