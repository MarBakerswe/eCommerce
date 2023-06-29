# E-commerce Store Application

## Description

This is a MERN stack e-commerce application with user authentication and CRUD functionality for products. It provides an interface for users to register, log in, view products, add products to a cart, and checkout.

## Project Structure

This project consists of a frontend and a backend. The frontend is built with React and the backend uses Express.js, Node.js, and a MongoDB database for persisting data.

## Dependencies

This project uses a number of dependencies:

- `React`: A JavaScript library for building user interfaces.
- `React Router`: Declarative routing for React.
- `Axios`: Promise based HTTP client for the browser and Node.js.
- `Express`: Fast, unopinionated, minimalist web framework for Node.js.
- `Body-parser`: Node.js body parsing middleware.
- `Cors`: Middleware that can be used to enable CORS with various options.
- `Mongoose`: MongoDB object modeling for Node.js.
- `@emotion/react` and `@emotion/styled`: CSS-in-JS library for building modern user interfaces.
- `@material-ui/core`, `@material-ui/icons`, and `@material-ui/lab`: Material-UI components and icons for React.
- `@mui/icons-material` and `@mui/material`: MUI components and icons for React.
- `@reduxjs/toolkit`: The official, opinionated, batteries-included toolset for efficient Redux development.
- `@testing-library/jest-dom`, `@testing-library/react`, and `@testing-library/user-event`: Set of libraries for testing React components.
- `babel-loader`: A webpack plugin for transpiling JavaScript using Babel.
- `bcrypt`: A library for hashing and salting passwords.
- `concurrently`: Run multiple commands concurrently.
- `crypto-js`: Library of crypto standards.
- `dotenv`: Zero-dependency module that loads environment variables from a `.env` file.
- `html-webpack-plugin`: Simplifies creation of HTML files to serve your webpack bundles.
- `jsonwebtoken`: Implementation of JSON Web Tokens.
- `pg-hstore`: A node package for serializing and deserializing JSON data to hstore format.
- `react-dom`: React package for working with the DOM.
- `react-redux`: Official React bindings for Redux.
- `react-router-dom`: DOM bindings for React Router.
- `react-scripts`: Scripts and configuration used by Create React App.
- `react-stripe-checkout`: Component for Stripe's checkout.
- `redux-persist`: Persist and rehydrate a redux store.
- `stripe`: Stripe official library.

## Setup Instructions

1. Clone the repository.
2. Navigate to the root directory and run `npm install`.
3. Navigate to the `frontend` directory and run `npm install`.
4. Navigate to the `backend` directory and run `npm install`.
5. In the root directory, run `npm start`. This will start both the frontend and backend servers.

## Note

This application is set up to connect to a MongoDB database. Make sure you have MongoDB installed and running in your development environment.

### Resources

- [CryptoJS - Hashed Password](https://cryptojs.gitbook.io/docs/): Documentation for CryptoJS, a library for hashing passwords.
- [React Stripe Checkout](https://www.npmjs.com/package/react-stripe-checkout): React component for integrating Stripe checkout in your application.
- [Setting Up S3 for Website Images](https://www.youtube.com/watch?v=cU92Ums-MWs): Video tutorial on setting up Amazon S3 for hosting website images.
- [Setting Up API Keys for Stripe Checkout](https://dashboard.stripe.com/test
