import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Student } from '../models/Student'
import { createLogger } from '../utils/logger'
import * as AWS  from 'aws-sdk'
import { StudentUpdate } from '../models/StudentUpdate'
const s3 = new AWS.S3({
    signatureVersion: 'v4'
  })

const logger = createLogger('studentDao')
const bucketName= process.env.STUDENT_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION
export class StudentDao {

    constructor(
      // document client work with DynamoDB locally: 
      private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
      // name of table to store /groups
      private readonly studentTable = process.env.STUDENT_TABLE,
      private readonly indexTable = process.env.USER_ID_INDEX
    ) {}

    // get students list based on userId
    // students list is an array so return studentItem[]
    async getStudents(userId: string): Promise<Student[]> {
        logger.info(`Fetching Student List from user ${userId}`);

        // use query() instead of scan(): 
        const result = await this.docClient.query({
            TableName: this.studentTable, 
            IndexName: this.indexTable, 
            KeyConditionExpression: 'userId = :userId', 
            ExpressionAttributeValues: { ':userId': userId },
            ScanIndexForward: false 
        }).promise()

        // return students as array of objects
        const students = result.Items;
        return students as Student[]
    }
    
    // insert new item into students talbe:
    // match with studentItem model:  
    async createStudent(student: Student): Promise<Student> {
        logger.info(`Saving new ${student.name} into ${this.studentTable}`)

        await this.docClient.put({
            TableName: this.studentTable,
            Item: student
        }).promise()

        return student as Student
    }

    // update student item based on userId and studentId
    async updateStudent(userId: string, studentId: string, student: StudentUpdate) {
        logger.info(`Update student with name ${student.name} of user ${userId}`);

        await this.docClient.update({
            TableName: this.studentTable, 
            // Update with key: 
            Key: {
                userId, 
                studentId: studentId, 
            }, 
            UpdateExpression: 
                'set #name = :name, #dob = :dob, #branch= :branch, #address= :address',
            ExpressionAttributeValues: {
                ':name': student.name,
                ':dob': student.dob,
                ':branch': student.branch,
                ':address': student.address
            }, 
            ExpressionAttributeNames: {
                '#name': 'name', 
                '#dob': 'dob',
                '#branch': 'branch',
                '#address': 'address'
            }
        }).promise()
    }

    // delete student item created by userId with studentId: 
    async deleteStudent(userId: string, studentId: string) {
        logger.info(`Delete Student record with id ${studentId}`); 

        await this.docClient.delete({
            TableName: this.studentTable, 
            // delete based on Key: userId and studentId: 
            Key: { "userId": userId, "studentId": studentId }
        }).promise()
    }

    getUploadUrl(studentId: string){
        return s3.getSignedUrl('putObject', {
            Bucket: bucketName,
            Key: studentId, 
            Expires: urlExpiration
        })
    }
}