import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { createLogger } from '../../utils/logger'
import { getJwtToken } from '../../auth/utils'
import { getStudentList } from '../../businessLogic/studentService'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('getStudents')
export const handler=middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  logger.info('Get all students for current user')
  const token= getJwtToken(event)
  const studentList = await getStudentList(token); 

  logger.info(`List of students: ${studentList}`);

  return {
        statusCode: 200,
        body: JSON.stringify({
            students: studentList
        })
  }
  
});

handler.use(
  cors({ credentials: true})
)
