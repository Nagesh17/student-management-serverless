// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'jc8szn0sid'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-06hrcd85.us.auth0.com',            // Auth0 domain
  clientId: 'Zjg5Td9zWjU9kResG4Nkiu0DKr6B2U2w',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
