import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUploadUrl } from '../../businessLogic/studentService'
import { createLogger } from '../../utils/logger'

const logger = createLogger('generateUploadUrl')
export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const studentId = event.pathParameters.studentId
  logger.info(`Generating s3 signed url for upload - ${studentId}`)
  // get the pre-signed url from S3 by studentID:
  const url = getUploadUrl(studentId);   

  return {
      statusCode: 200,
      body: JSON.stringify({
          uploadUrl: url, 
      })
  }
});

handler.use(
  cors({ credentials: true})
)
