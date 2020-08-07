import 'source-map-support/register'

import { APIGatewayProxyEvent,  APIGatewayProxyResult } from 'aws-lambda'

import { CreateStudentRequest } from '../../requests/CreateStudentRequest'
import { createLogger } from '../../utils/logger'
import { getJwtToken } from '../../auth/utils'
import { createStudent } from '../../businessLogic/studentService'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('createStudent')
export const handler=middy( async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newStudent: CreateStudentRequest = JSON.parse(event.body)
  logger.info(`Creating new student item- ${newStudent}`)
  
  const jwtToken = getJwtToken(event)
  const newItem = await createStudent(newStudent, jwtToken)
  return {
    statusCode: 201,
    body: JSON.stringify({
      item: newItem
    })
  }
});

handler.use(
  cors({ credentials: true})
)