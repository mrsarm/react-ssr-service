# React Server Side Rendering (SSR) service

Example webapp service to render HTML dynamically in the server side with React.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app),
but changed a lot to use React only in the server-side.

If you need React in the client side, just use **Create React App** and skip this example,
and if you need to build an isomorphic web app with React (an app that can render in the server and
the client side as well), you should use a framework like *Next.js* or *Remix* instead.

The purpose of a service like this could be to build reports in HTML format
in a server using React templates.

> 🚧 Under construction.


## Available Scripts

In the project directory, you can run among other scripts:

### `yarn start:dev`

Runs the app in the development mode.\
Open http://localhost:3001 to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.

## Access the app

- Home: http://localhost:3001
- Sum page: http://localhost:3001/sum?num1=2&num2=3 to sum 2 and 3.
- Sum page with a POST request:

      curl -X POST http://localhost:3001/sum \
          -H Content-Type:application/json \
          -d '{"num1": 10, "num2": 15}' -o report.html

  This way is useful when you need to build an HTML report providing all
  the input data, and providing it in the query string of a GET request may
  not be the best solution if the input data is too big, or it has nested fields,
  so posting it with a JSON body is a better solution than a GET request.


## Docker

Build the image with the following command:

    docker build -t react-ssr-service .

Run with:

    docker run --name ssr -p 3001:3001 react-ssr-service

## About

Just a test project.

**Source Code**: https://github.com/mrsarm/react-ssr-service

**Authors**: Mariano Ruiz <mrsarm (at) gmail>

2024 | Apache-2.0
