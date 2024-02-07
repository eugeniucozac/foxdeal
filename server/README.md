
# Task Manager Server

This server application provides the backend for the Task Manager, leveraging GraphQL with Apollo Server, ExpressJS, and MongoDB for efficient data management and API operations.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB running locally or accessible via a cloud provider.

### Installation

1. Clone the repository (if you haven't already for the frontend part).
   ```sh
   git clone
   ```
2. Navigate to the server directory (assuming it's separate from the frontend).
   ```sh
   cd server
   ```
3. Install the necessary packages.
   ```sh
   npm install
   ```

### Running the Server

To start the server, run:
```sh
npm start
```
This will compile the TypeScript files to JavaScript and then start the server using nodemon for live reloading. The server will be available at [http://localhost:8080/graphql](http://localhost:8080/graphql), where you can interact with the GraphQL API.

## Tech Stack

- **ExpressJS**: A fast, unopinionated, minimalist web framework for Node.js.
- **GraphQL**: A query language for your API, and a server-side runtime for executing queries by using a type system you define for your data.
- **Apollo Server**: An open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client. It's built on top of Express.js.
- **NodeJS**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **MongoDB**: A NoSQL database designed for modern application developers and for the cloud era.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

## License

This project is licensed under the ISC License.
