import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import {deleteStudent } from '../../businessLogic/studentService'
import { getJwtToken } from '../../auth/utils'

const logger = createLogger('deleteStudent')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const studentId = event.pathParameters.studentId
  logger.info(`Deleting student item with Id - ${studentId}`)
  const token= getJwtToken(event)

  await deleteStudent(token, studentId); 
  return {
    statusCode: 200, 
    body: 'Sucessfully deleted!'
}

});

handler.use(
  cors({ credentials: true})
)
