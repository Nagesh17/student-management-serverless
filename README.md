# Student-Management Application using Serverless

The project provides the following features-
1) Create new student
2) Get all students along with student image.
3) Update a student to attach image to it.
4) Delete students

# Functionality of the application

This application will allow creating/removing/updating/fetching Student items. Each Student item can optionally have an attachment image. Each user only has access to Student items that he/she has created.


# Frontend

The `client` folder contains a web application. This web-app uses the backend APIs which are developed in serverless.

The only file that you need to edit is the `config.ts` file in the `client` folder. 

```ts
const apiId = '...' API Gateway id
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: '...',    // Domain from Auth0
  clientId: '...',  // Client id from an Auth0 application
  callbackUrl: 'http://localhost:3000/callback'
}
```

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless Student-Management application.