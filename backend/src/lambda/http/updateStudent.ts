import 'source-map-support/register'
import { updateStudent } from '../../businessLogic/studentService'
import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'
import { UpdateStudentRequest } from '../../requests/UpdateStudentRequest'
import { getJwtToken } from '../../auth/utils'

const logger = createLogger('Updatestudent');
export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const studentId = event.pathParameters.studentId
  const updatedStudent: UpdateStudentRequest = JSON.parse(event.body)
  // TODO: Update a student item with the provided id using values in the "updatedstudent" object
  logger.info(`Update Student Item- ${updatedStudent}`);
  const jwtToken = getJwtToken(event)
  // update student item from business logic layer: 
  await updateStudent(jwtToken, studentId, updatedStudent)

  return {
      statusCode: 200, 
      body: 'Sucessfully updated!'
  }
});

handler.use(
  cors({ credentials: true})
)